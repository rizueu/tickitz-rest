// Import Model
const Times = require('../models/Times')

// Import Helpers
const response = require('../helpers/Response')

exports.createTime = async (req, res) => {
  try {
    // check the time
    const timeExist = await Times.findOne({ showTime: req.body.showTime })
    if (timeExist.length > 0) return response(res, 400, false, `Showtime ${req.body.showTime} is already exist`)
    const results = await Times.create(req.body)
    if (results.affectedRows > 0) return response(res, 200, true, 'Successfully add new showtimes')
  } catch (error) {
    return response(res, 500, false, error.message)
  }
}

exports.getTimes = async (req, res) => {
  try {
    const times = await Times.findAll()
    return response(res, 200, true, 'All available showtime hours', times)
  } catch (error) {
    return response(res, 500, false, error.message)
  }
}
