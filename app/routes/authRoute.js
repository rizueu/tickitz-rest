const router = require('express').Router()
const { register, activate, login, forgotPassword, editUser, editPassword, uploadPhoto, getUser } = require('../controllers/authController')
const authMiddleware = require('../middlewares/auth')

router.post('/register', register)
router.post('/login', login)
router.patch('/user/upload', authMiddleware.isUser, uploadPhoto)
router.patch('/forgot_password', forgotPassword)
router.patch('/activate', activate)
router.patch('/password/:id/:email', editPassword)
router.patch('/user/:id', authMiddleware.isUser, editUser)
router.get('/user/:id', authMiddleware.isUser, getUser)

module.exports = router
