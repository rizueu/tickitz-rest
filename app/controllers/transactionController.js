// Import Modules
const moment = require('moment')

// Import Model
const Transactions = require('../models/Transactions')
const Showtimes = require('../models/Showtimes')
const SoldSeats = require('../models/SoldSeats')

// Import Helpers
const response = require('../helpers/Response')

exports.buyTicket = async (req, res) => {
  try {
    const result = await Transactions.create(req.data.id, req.body)

    if (!result) {
      return response(res, 400, false, 'Failed to buy a ticket')
    } else {
      const soldSeatsList = await SoldSeats.getSoldSeatByCondition({
        movieId: req.body.movieId,
        cinemaId: req.body.cinemaId,
        id: req.body.showTimeId,
        timeId: req.body.timeId
      })
      const isSoldSeatExists = []
      soldSeatsList.forEach(item => {
        if (req.body.seats.includes(item.seatCode.trim())) {
          isSoldSeatExists.push(true)
        } else {
          isSoldSeatExists.push(false)
        }
      })
      if (isSoldSeatExists.indexOf(true) !== -1) {
        const results = await Transactions.delete(result.id)
        if (!results) {
          return response(res, 400, false, "Can't remove transaction")
        }
        return response(res, 400, false, 'Sorry the selected seat has been used')
      }
      try {
        const result = await SoldSeats.create(req.body.showTimeId, req.body.seats.split(','))
        if (!result) {
          return response(res, 400, false, 'Failed to add sold seat')
        } else {
          return response(res, 200, true, 'Thank you for the order :)')
        }
      } catch (err) {
        console.log(err)
        return response(res, 500, false, 'Server Error')
      }
    }
  } catch (error) {
    console.log(error)
    return response(res, 500, false, 'Server Error')
  }
}

exports.getUserOrderHistory = async (req, res) => {
  try {
    const results = await Transactions.getOrderHistory(req.data.id)

    if (results.length < 1) {
      return response(res, 400, false, 'Empty order history', results)
    } else {
      const orderHistory = results.map((item, index, array) => {
        return {
          ...array[index],
          showTimeDate: moment(item.showTimeDate).format('DD MMMM YYYY'),

        }
      })
      return response(res, 200, true, 'Get Order History Successfully', orderHistory)
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Server Error')
  }
}

exports.getUserOrderHistoryDetail = async (req, res) => {
  try {
    const results = await Transactions.getOrderHistoryDetail(req.params.id, req.data.id)

    if (results.length < 1) {
      return response(res, 400, false, 'Empty order history', results)
    } else {
      const orderHistory = {
        ...results[0],
        showTimeDate: moment(results[0].showTimeDate).format('DD MMMM YYYY'),
        cinemaPoster: process.env.APP_URL + '/public/cinemas/' + results[0].cinemaPoster
      }
      return response(res, 200, true, 'Get Order History Successfully', orderHistory)
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, 'Server Error')
  }
}
