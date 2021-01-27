// import modules
const fs = require('fs')

// import helpers
const response = require('../helpers/Response')
const upload = require('../helpers/Upload')

// import models
const Cinemas = require('../models/Cinemas')

exports.createCinema = async (req, res) => {
  const {
    cinemaName,
    address,
    pricePerSeat,
    city
  } = req.body

  const picture = await upload(req, 'cinemas')

  try {
    // Check the cinemas
    const cinemaExist = await Cinemas.findOne({ cinemaName })
    if (cinemaExist.length > 0) return response(res, 400, false, `Cinema with name: ${cinemaName} is already exists.`)

    const results = await Cinemas.create({
      cinemaName,
      address,
      pricePerSeat,
      city,
      picture
    })

    const newCinema = await Cinemas.findAll({ id: results.insertId })
    return response(res, 201, true, 'Successfully added new cinema', newCinema[0])
  } catch (error) {
    return response(res, 500, false, error.message)
  }
}

exports.getCinemas = async (req, res) => {
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
    const cinemas = await Cinemas.getAllCinemas(limit, offset, search, order, sort)
    if (cinemas.length < 1) return response(res, 400, false, 'Cinemas unavailable', cinemas)
    const nextCinemas = await Cinemas.getAllCinemas(limit, offset + dataLimit, search, order, sort)

    const queryKey = Object.keys(req.query)
    const queryValue = Object.values(req.query)
    const query = queryKey.map((item, index) => item + '=' + queryValue[index]).join('&')
    const nextPageLink = nextCinemas.length > 0 ? `${process.env.APP_URL}/api/v1/admin/cinemas?${query}` : null
    const prevPageLink = (offset - limit) >= 0 ? `${process.env.APP_URL}/api/v1/admin/cinemas?${query}` : null
    return response(res, 200, true, 'All of the cinemas', cinemas, prevPageLink, nextPageLink)
  } catch (error) {
    return response(res, 500, false, error.message)
  }
}

exports.getCinemaById = async (req, res) => {
  const { id } = req.params

  try {
    const results = await Cinemas.findAll({ id })
    return response(res, 200, true, `Cinemas with id: ${id}`, results[0])
  } catch (error) {
    response(res, 500, false, error.message)
  }
}

exports.deleteCinema = async (req, res) => {
  const { id } = req.params

  try {
    const beforeDeleted = await Cinemas.findAll({ id })
    const results = await Cinemas.destroy(Number(id))
    if (results.affectedRows > 0) {
      fs.unlink('./public/cinemas/' + results[0].picture, err => {
        if (err) {
          console.log(err)
        }
      })
    }
    return response(res, 500, false, `Cinema with id: ${id} successfully deleted`, beforeDeleted)
  } catch (error) {
    response(res, 500, false, error.message)
  }
}

exports.updateCinema = async (req, res) => {
  const { id } = req.params

  let picture

  if (req.files) {
    picture = await upload(req, 'cinemas')
  }

  try {
    const before = await Cinemas.findAll({ id })
    const results = await Cinemas.update(id, picture, req.body)
    return response(res, 200, true, `Cinema with id: ${id} successfully edited`, { before: before[0], after: results[0] })
  } catch (error) {
    response(res, 500, false, error.message)
  }
}
