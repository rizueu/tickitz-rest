// Import Models
const Transactions = require('../models/Transactions')
const Showtimes = require('../models/Showtimes')
// Import helpers
const response = require('../helpers/Response')

exports.buyTicket = async (req, res) => {
  const { userId = req.userData.id, ticketDate, ticketTime, movieTitle, cinemaName, ticketCount, seats, totalPayment, paymentMethod } = req.body
}
