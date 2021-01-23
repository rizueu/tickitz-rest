const router = require('express').Router()
const { createMovie } = require('../controllers/moviesController')

router.route('/movies')
  .post(createMovie)

module.exports = router
