const router = require('express').Router()
const { getGenres, getGenreById } = require('../controllers/genresController')

router.get('/', getGenres)
router.get('/:id', getGenreById)

module.exports = router
