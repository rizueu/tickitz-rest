// Import Modules
const jwt = require('jsonwebtoken')
// Import Helpers
const response = require('../helpers/Response')

const { APP_KEY } = process.env

exports.verifyToken = (req, res, next) => {
  // Checking the token
  const token = req.header('auth-token')
  if (!token) return response(res, 401, false, 'Access Denied')
  // Verifying the token
  const verifiedUser = jwt.verify(token, APP_KEY)
  if (!verifiedUser) return response(res, 400, false, 'Invalid Token')
  req.userData = verifiedUser
  next()
}

exports.isAdmin = (req, res, next) => {
  const token = req.header('auth-token')
  if (token) {
    jwt.verify(token, APP_KEY, (err, decode) => {
      if (err) {
        return response(res, 400, false, err.message)
      } else {
        if (decode.role === 'admin') {
          req.data = decode
          return next()
        } else {
          return response(res, 403, false, 'Access Denied')
        }
      }
    })
  } else {
    return response(res, 403, false, 'Access Denied')
  }
}

exports.isUser = (req, res, next) => {
  const token = req.header('auth-token')
  if (token) {
    jwt.verify(token, APP_KEY, (err, decode) => {
      if (err) {
        return response(res, 400, false, err.message)
      } else {
        if (decode.role === 'user' || decode.role === 'admin') {
          req.data = decode
          return next()
        } else {
          return response(res, 403, false, 'Access Denied')
        }
      }
    })
  } else {
    return response(res, 403, false, 'Access Denied')
  }
}
