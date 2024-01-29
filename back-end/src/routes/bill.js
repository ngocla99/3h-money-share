const express = require('express')
const router = express.Router()
const billController = require('../controllers/bill')

router.get('', billController.getBills)

router.get('/group/:groupId', billController.getBillsInGroup)

router.post('', billController.createBill)

router.get('/:id', billController.getBill)

router.patch('/:id', billController.updateBill)

router.delete('/:id', billController.deleteBill)

router.post('/delete', billController.deleteBills)

module.exports = router
