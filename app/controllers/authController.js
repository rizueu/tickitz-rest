// Import Modules
const bcrypt = require('bcrypt')
// Import Model
const User = require('../models/Auth')
// Import Helpers
const { registerValidation } = require('../helpers/Validation')
const response = require('../helpers/Response')

exports.register = async (req, res) => {
  // Validate the body request
  const { error } = registerValidation(req.body)
  if (error) {
    const { message } = error.details[0]
    return response(res, 400, false, message)
  }
  try {
    // Checking if user is already in the database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist.length > 0) {
      return response(res, 400, false, 'Email already exists')
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Create a new user
    const results = await User.create({
      email: req.body.email,
      password: hashedPassword
    })

    if (results.affectedRows > 0) {
      const finalResults = await User.findAll({ id: results.insertId })
      return response(res, 201, true, 'Successfully registered a new User.', finalResults[0])
    }
  } catch (error) {
    return response(res, 500, false, error.message)
  }
}
