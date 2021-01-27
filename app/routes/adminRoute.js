const router = require('express').Router()
const { createMovie, getMovies, getMovieById, updateMovie, deleteMovie } = require('../controllers/moviesController')
const { createGenre, getGenres, getGenreById, updateGenre, deleteGenre } = require('../controllers/genresController')
const { createCinema, getCinemas, getCinemaById, updateCinema, deleteCinema } = require('../controllers/cinemasController')
const { createTime, getTimes } = require('../controllers/timesController')
// Import Models
const Showtimes = require('../models/Showtimes')
// Import Helpers
const response = require('../helpers/Response')

// Movie route for admin
router.route('/movies')
  .post(createMovie)
  .get(getMovies)

router.route('/movies/:id')
  .get(getMovieById)
  .patch(updateMovie)
  .delete(deleteMovie)

// Genre route for admin
router.route('/genres')
  .post(createGenre)
  .get(getGenres)
  .put(createGenre)

router.route('/genres/:id')
  .get(getGenreById)
  .patch(updateGenre)
  .delete(deleteGenre)

// Cinemas route for admin
router.route('/cinemas')
  .post(createCinema)
  .get(getCinemas)
  .put(createCinema)

router.route('/cinemas/:id')
  .get(getCinemaById)
  .patch(updateCinema)
  .delete(deleteCinema)

// Route for create schedule showtimes
router.route('/times')
  .post(createTime)
  .get(getTimes)

// Route for create showtimes
router.post('/showtimes', async (req, res) => {
  const { timeId, cinemaId, movieId } = req.query
  if (!timeId || !cinemaId || !movieId) return response(res, 400, false, 'Bad Request')
  try {
    const results = await Showtimes.create({
      showTimeDate: req.body.showTimeDate,
      timeId,
      cinemaId,
      movieId
    })
    return (results.affectedRows > 0) ? response(res, 200, true, 'Successfully create a showtime') : response(res, 400, false, 'Bad Request')
  } catch (error) {
    return response(res, 500, false, error.message)
  }
})

module.exports = router
