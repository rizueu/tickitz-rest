// Import Model
const Genres = require('../models/Genres')

// Import Helpers
const { addGenreValidation } = require('../helpers/Validation')
const response = require('../helpers/Response')

exports.createGenre = async (req, res) => {
  // Validate the body request
  const { error } = addGenreValidation(req.body)
  if (error) {
    const { message } = error.details[0]
    return response(res, 400, false, message)
  }
  try {
    // Checking the genre in database
    const genreExist = await Genres.findOne(req.body)
    if (genreExist > 0) return response(res, 400, false, 'Genre already exists')
    // Add new genre
    const results = await Genres.create(req.body)
    if (results.affectedRows > 0) return response(res, 201, true, 'New Genre has been created')
  } catch (error) {
    return response(res, 500, false, error.message)
  }
}

exports.getGenres = async (req, res) => {
  // Pagination
  const {
    limit = 5,
    page = 1,
    search = '',
    order = 'id',
    sort = 'ASC'
  } = req.query
  const dataLimit = Number(limit) * Number(page)
  const offset = (Number(page) - 1) * Number(limit)
  // Limit cannot be minuy
  if (limit < 1) {
    return response(res, 400, false, 'Bad Request')
  }
  try {
    const genres = await Genres.getAllGenres(limit, offset, search, order, sort)
    const nextGenres = await Genres.getAllGenres(limit, offset + dataLimit, search, order, sort)
    const queryKey = Object.keys(req.query)
    const queryValue = Object.values(req.query)
    const query = queryKey.map((item, index) => item + '=' + queryValue[index]).join('&')
    const nextPageLink = nextGenres.length > 0 ? `${process.env.APP_URL}/api/v1/admin/genres?${query}` : null
    const prevPageLink = (offset - limit) >= 0 ? `${process.env.APP_URL}/api/v1/admin/genres?${query}` : null
    return response(res, 200, true, 'All of the genres', genres, prevPageLink, nextPageLink)
  } catch (error) {
    return response(res, 500, false, error.message)
  }
}

exports.getGenreById = async (req, res) => {
  const { id } = req.params
  try {
    const results = await Genres.findAll({ id })
    // Checking if genre is exist
    if (results.length < 1) return response(res, 400, false, `Genre with id: ${id} is not exists`)
    return response(res, 200, true, `Genre with id: ${id}`, results[0])
  } catch (error) {
    return response(res, 500, false, error.message)
  }
}

exports.updateGenre = async (req, res) => {
  const { id } = req.params
  try {
    // Checking if genre is exist
    const before = await Genres.findAll({ id })[0]
    if (before.length < 1) return response(res, 400, false, `Genre with id: ${id} is not exists`)
    // Validate the body request
    const { error } = addGenreValidation(req.body)
    if (error) {
      const { message } = error.details[0]
      return response(res, 400, false, message)
    }
    const results = await Genres.patchGenre(id, req.body)[0]
    const after = await Genres.findAll({ id })
    const finalResults = {
      before,
      after
    }
    if (results.affectedRows > 0) return response(res, 200, true, `Successfully update genre with id: ${id}`, finalResults)
  } catch (error) {
    return response(res, 500, false, error.message)
  }
}

exports.deleteGenre = async (req, res) => {
  const { id } = req.params
  if (!id) return response(res, 400, false, 'Bad Request')
  try {
    // Checking if genre is exist
    const genre = await Genres.findAll({ id })
    if (genre.length < 1) return response(res, 400, false, `Genre with id: ${id} is not exists`)
    // Destroy that genre
    const results = await Genres.destroy(id)
    if (results.affectedRows > 0) return response(res, 200, true, `Successfully destroy genre with id: ${id}`)
  } catch (error) {

  }
}
