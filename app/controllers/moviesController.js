// Import Model
const Movies = require('../models/Movies')

// Import Helpers
const { addMovieValidation } = require('../helpers/Validation')
const upload = require('../helpers/Upload')
const response = require('../helpers/Response')

exports.createMovie = async (req, res) => {
  // Validate the body request
  const { error } = addMovieValidation(req.body)
  if (error) {
    const { message } = error.details[0]
    return response(res, 400, false, message)
  }
  // // upload an images
  // const picture = await upload(req, 'movies')
  // console.log(picture)
}
