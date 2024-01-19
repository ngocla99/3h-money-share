const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.post('', (req, res) => {
  const user = {
    name: 'nemo',
    email: 'nemo@gmail.com',
    password: ''
  }
  res.send('About birds')
})

router.get('', (req, res) => {
  res.send('About birds')
})

module.exports = router
