const router = require('express').Router()
const { register, activate, login, forgotPassword, editUser, editPassword, getUser } = require('../controllers/authController')

router.post('/register', register)
router.post('/login', login)
router.patch('/forgot_password', forgotPassword)
router.patch('/activate', activate)
router.patch('/user/:id', editUser)
router.patch('/password/:id/:emai', editPassword)
router.get('/user/:id', getUser)

module.exports = router
