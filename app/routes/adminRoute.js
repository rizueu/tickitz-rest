const router = require('express').Router()
const { createMovie } = require('../controllers/moviesController')
const { createGenre, getGenres, getGenreById, updateGenre, deleteGenre } = require('../controllers/genresController')

router.route('/movies')
  .post(createMovie)

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
