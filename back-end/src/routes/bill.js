const express = require('express')
const router = express.Router()
const billController = require('../controllers/bill')

router.route('').get(billController.getBills).post(billController.createBill)

router.route('/loans').get(billController.getLoans)

router.route('/:id').get(billController.getBill).patch(billController.updateBill).delete(billController.deleteBill)

router.get('/group/:groupId', billController.getBillsInGroup)
router.post('/delete', billController.deleteBills)

module.exports = router
