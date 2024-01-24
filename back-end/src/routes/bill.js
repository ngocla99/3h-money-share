const express = require('express')
const router = express.Router()
const billController = require('../controllers/bill')

router.get('', billController.getBills)

router.get('/group/:id', billController.getBillsInGroup)

router.post('', billController.createBill)

module.exports = router
