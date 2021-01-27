const router = require('express').Router()
const { getMovies, getMovieById, getMoviesByMonth } = require('../controllers/moviesController')

router.get('/', getMovies)
router.get('/:id', getMovieById)
router.get('/month/:month', getMoviesByMonth)

module.exports = router
