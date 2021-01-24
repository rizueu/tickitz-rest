const router = require('express').Router()
const upload = require('express-fileupload')
// Import Middlewares
const authMiddleware = require('../middlewares/auth')
// Import Models
const Genres = require('../models/Genres')
// Import Helpers
const response = require('../helpers/Response')

router.use(upload({ createParentPath: true }))

router.get('/genre/:genre', async (req, res) => {
  const { genre } = req.params
  if (!genre) return response(res, 400, false, 'Bad Request')
  // Pagination
  const {
    limit = 3,
    page = 1,
    search = '',
    order = 'id',
    sort = 'ASC'
  } = req.query
  const dataLimit = Number(limit) * Number(page)
  const offset = (Number(page) - 1) * Number(limit)
  try {
    const movies = await Genres.getMoviesByGenre(limit, offset, search, order, sort)
    const nextMovies = await Genres.getMoviesByGenre(limit, offset + dataLimit, search, order, sort)
    const queryKey = Object.keys(req.query)
    const queryValue = Object.values(req.query)
    const query = queryKey.map((item, index) => item + '=' + queryValue[index]).join('&')
    const nextPageLink = nextMovies.length > 0 ? `${process.env.APP_URL}/api/v1/admin/genres?${query}` : null
    const prevPageLink = (offset - limit) >= 0 ? `${process.env.APP_URL}/api/v1/admin/genres?${query}` : null
    return response(res, 200, true, 'All of the genres', movies, prevPageLink, nextPageLink)
  } catch (error) {
    return response(res, 500, false, error.message)
  }
})

router.use('/admin', authMiddleware.verifyToken, require('./adminRoute'))

module.exports = router
