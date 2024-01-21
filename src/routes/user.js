const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/me', userController.getMe)

router.get('/others', userController.getOthers)

router.get('/group', userController.getGroups)

router.post('/group', userController.createGroup)

module.exports = router
