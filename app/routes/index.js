const router = require('express').Router()
const upload = require('express-fileupload')
const moment = require('moment')
// Import Middlewares
const authMiddleware = require('../middlewares/auth')
// Import Models
const Genres = require('../models/Genres')
const Moviegoers = require('../models/Moviegoers')
const Cinemas = require('../models/Cinemas')
const Showtimes = require('../models/Showtimes')
const Auth = require('../models/Auth')
// Import Helpers
const response = require('../helpers/Response')
const transporter = require('../config/Mail')

const ticketController = require('../controllers/ticketController')

router.use(upload({ createParentPath: true }))

router.use('/movies', require('./moviesRoute'))
router.use('/genres', require('./genresRoute'))
router.use('/cinemas', require('./cinemasRoute'))
router.use('/times', require('./timesRoute'))

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

router.post('/moviegoers', async (req, res) => {
  const { email } = req.body
  try {
    // Check if user is already be a member
    const moviegoersEmail = await Moviegoers.findOne({ email })
    const userEmail = await Auth.findOne({ email })
    if (userEmail.length > 0 || moviegoersEmail.length > 0) return response(res, 400, false, 'You have become a moviegoers :)')
    // Input user email into database
    const results = await Moviegoers.create(req.body)
    if (results.affectedRows > 0) return response(res, 201, true, 'Thank you for being Moviegoers :)')
    transporter.sendMail({
      from: `${process.env.SMTP_USERNAME}`,
      to: `${userEmail[0].email}`,
      subject: 'Thank you for being Moviegoers :)',
      text: "By joining you as a Moviegoers, we'll always send you the latest updates via email"
    }, (error, info) => {
      if (error) return response(res, 500, false, error.response)
      return response(res, 202, true, info)
    })
  } catch (error) {
    return response(res, 500, false, error.message)
  }
})

router.get('/showtimes', async (req, res) => {
  const { showTimeDate = moment(Date.now()).format('YYYY-MM-D'), city = 'Jakarta', movieId } = req.query
  try {
    const showtimes = await Cinemas.getShowtimes(showTimeDate, city, movieId)
    const showTimes = []
    showtimes.forEach(item => {
      showTimes.push({
        id: item.id,
        showTime: item.showTime
      })
    })
    let results = showtimes.filter((item, index, array) => {
      return ((item.id !== ((index >= array.length - 1 ? 0 : array[index + 1].id))))
    })
    results = results.map(item => {
      return {
        id: item.id,
        movieId: item.movieId,
        movieTitle: item.movieTitle,
        movieCategory: item.category,
        picture: `${process.env.APP_URL}/cinemas/${item.picture}`,
        cinemaName: item.cinemaName,
        address: item.address,
        pricePerSeat: item.pricePerSeat,
        city: item.city,
        showTimeDate: item.showTimeDate,
        showTime: showTimes.filter(showTimeItem => showTimeItem.id === item.id).map(item => item.showTime)
      }
    })
    return response(res, 200, true, 'Lists of Showtimes', results)
  } catch (error) {
    return response(res, 500, false, error.message)
  }
})

router.get('/selected-showtime', async (req, res) => {
  const { showTimeDate, timeId, cinemaId, movieId } = req.query
  try {
    const results = await Showtimes.findAllByCond({ showTimeDate, timeId, cinemaId, movieId })
    console.log(results)
    return response(res, 200, true, 'Here it is, your selected Showtime id', { showTimeId: results[0].id })
  } catch (error) {
    return response(res, 500, false, error.message)
  }
})

router.use('/admin', authMiddleware.isAdmin, require('./adminRoute'))
router.use('/transaction', authMiddleware.isUser, require('./transactionRoute'))
router.get('/ticket/:id', authMiddleware.isUser, ticketController.getTicketByMovieId)
router.get('/soldseats', authMiddleware.isUser, ticketController.getAllSoldSeats)

module.exports = router
