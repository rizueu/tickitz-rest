const router = require('express').Router()
const { getCinemas, getCinemaById } = require('../controllers/cinemasController')

router.get('/', getCinemas)
router.get('/:id', getCinemaById)

module.exports = router
