const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const { isAuthenticated } = require('../middlewares/is-auth')

router.post('/login', authController.login)

router.post('/signup', authController.signup)

router.get('/me', isAuthenticated, authController.getMe)

module.exports = router
