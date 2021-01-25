const router = require('express').Router()
const { createMovie, getMovies, getMovieById, updateMovie, deleteMovie } = require('../controllers/moviesController')
const { createGenre, getGenres, getGenreById, updateGenre, deleteGenre } = require('../controllers/genresController')

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

module.exports = router
