// Import Modules
const moment = require('moment')
const fs = require('fs')

// Import Model
const Movies = require('../models/Movies')
const Auth = require('../models/Auth')
const Moviegoers = require('../models/Moviegoers')

// Import Helpers
const upload = require('../helpers/Upload')
const transporter = require('../config/Mail')
const response = require('../helpers/Response')

exports.createMovie = async (req, res) => {
  try {
    // // upload an images
    const { title, releaseDate, duration, director, casts, synopsis, genreId, category } = req.body
    const picture = await upload(req, 'movies')
    const data = {
      title,
      releaseDate,
      month: moment(releaseDate).format('MMMM'),
      duration,
      category,
      director,
      casts,
      synopsis,
      picture,
      genreId
    }
    const results = await Movies.createMovie(data)
    const newMovie = await Movies.findAll({ id: results.insertId })
    if (results.affectedRows > 0) {
      const recipients = []
      const user = await Auth.findOne('email')
      const moviegoers = await Moviegoers.findOne('email')
      user.forEach(item => recipients.push(item.email))
      moviegoers.forEach(item => recipients.push(item.email))
      transporter.sendMail({
        from: `${process.env.SMTP_USERNAME}`,
        to: recipients,
        subject: 'Update New Movie',
        html: `<h3>${newMovie[0].title}</h3>`
      }, (error, info) => {
        if (error) return response(res, 500, false, error.response)
        return response(res, 201, true, 'Successfully registered a new User.', info)
      })
      return response(res, 200, true, 'Successfully create a new Movie', newMovie[0])
    }
  } catch (error) {
    return response(res, 500, false, error.message)
  }
}

exports.getMovies = async (req, res) => {
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
  // Limit cannot be minus
  if (limit < 1) {
    return response(res, 400, false, 'Bad Request')
  }
  try {
    const movies = await Movies.getAllMovies(limit, offset, search, order, sort)
    const nextMovies = await Movies.getAllMovies(limit, offset + dataLimit, search, order, sort)
    const queryKey = Object.keys(req.query)
    const queryValue = Object.values(req.query)
    const query = queryKey.map((item, index) => item + '=' + queryValue[index]).join('&')
    const nextPageLink = nextMovies.length > 0 ? `${process.env.APP_URL}/api/v1/admin/movies?${query}` : null
    const prevPageLink = (offset - limit) >= 0 ? `${process.env.APP_URL}/api/v1/admin/movies?${query}` : null
    return response(res, 200, true, 'All of the movies', movies, prevPageLink, nextPageLink)
  } catch (error) {
    return response(res, 500, false, error.message)
  }
}

exports.getMovieById = async (req, res) => {
  const { id } = req.params
  try {
    const results = await Movies.getMovieById({ id })
    // Checking if genre is exist
    if (results.length < 1) return response(res, 400, false, `Movie with id: ${id} is not exists`)
    return response(res, 200, true, `Movie with id: ${id}`, results[0])
  } catch (error) {
    return response(res, 500, false, error.message)
  }
}

exports.getMoviesByMonth = async (req, res) => {
  let { month } = req.params
  month = month.charAt(0).toUpperCase() + month.slice(1)
  try {
    const results = await Movies.getMoviesByMonth({ month })
    // Checking if genre is exist
    if (results.length < 1) return response(res, 400, false, `Movie with month: ${month} is not exists`)
    return response(res, 200, true, `Movie with month: ${month}`, results)
  } catch (error) {
    return response(res, 500, false, error.message)
  }
}

exports.updateMovie = async (req, res) => {
  const { id } = req.params
  let picture

  if (req.files) {
    picture = await upload(req, 'movies')
  }
  try {
    // Check movie in database
    const before = await Movies.findAll({ id })
    if (before.length < 1) return response(res, 400, false, `Movie with id: ${id} is not exists.`)
    // Check the picture
    if (typeof picture === 'string') {
      fs.unlink('./public/movies/' + before[0].picture, error => {
        if (error) console.log(error)
      })
    }
    // Checking if updateMovie is success
    const results = await Movies.updateMovie(id, picture, req.body)
    if (results.affectedRows > 0) {
      const after = await Movies.findAll({ id })
      return response(res, 200, true, `Movie with id: ${id} successfully edited`, { before: before[0], after: after[0] })
    }
  } catch (error) {
    return response(res, 500, false, error.message)
  }
}

exports.deleteMovie = async (req, res) => {
  const { id } = req.params
  try {
    // Check movie in database
    const movie = await Movies.findAll({ id })
    if (movie.length < 1) return response(res, 400, false, `Movie with id: ${id} is not exists`)
    const results = await Movies.destroy(Number(id))
    if (results.affectedRows > 0) {
      fs.unlink('./public/movies/' + movie[0].picture, error => {
        if (error) console.log(error)
      })
    }
    return response(res, 200, true, `Movie with id: ${id} successfully deleted`, movie[0])
  } catch (error) {
    return response(res, 500, false, error.message)
  }
}
