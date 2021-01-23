// Import Modules
const jwt = require('jsonwebtoken')
// Import Helpers
const response = require('../helpers/Response')

exports.verifyToken = (req, res, next) => {
  // Checking the token
  const token = req.header('auth-token')
  if (!token) return response(res, 401, false, 'Access Denied')
  // Verifying the token
  const verifiedUser = jwt.verify(token, process.env.APP_KEY)
  if (!verifiedUser) return response(res, 400, false, 'Invalid Token')
  req.userData = verifiedUser
  next()
}
