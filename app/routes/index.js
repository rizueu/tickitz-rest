const router = require('express').Router()
// Import Middlewares
const authMiddleware = require('../middlewares/auth')

router.use('/admin', authMiddleware.verifyToken, require('./adminRoute'))

module.exports = router
