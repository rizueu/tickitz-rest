const router = require('express').Router()
const { register, activate, login, forgotPassword } = require('../controllers/authController')

router.post('/register', register)
router.patch('/activate', activate)
router.post('/login', login)
router.patch('/forgot_password', forgotPassword)

module.exports = router
