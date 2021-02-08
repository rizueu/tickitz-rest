// import all modules
const express = require('express')

// import all controllers
const transaction = require('../controllers/transactionController')

// init router
const router = express.Router()

router.post('/', transaction.buyTicket)
router.get('/history', transaction.getUserOrderHistory)
router.get('/history/:id', transaction.getUserOrderHistoryDetail)

module.exports = router
