// import all modules
const express = require('express')

// import controller
const ticketController = require('../controllers/ticketController')

// import middlewares
const auth = require('../middlewares/auth')

// init router
const router = express.Router()

router.get('/ticket/:id', auth.isUser, ticketController.getTicketByMovieId)
router.get('/soldseats', auth.isUser, ticketController.getAllSoldSeats)

module.exports = router
