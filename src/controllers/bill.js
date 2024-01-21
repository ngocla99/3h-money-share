const Bill = require('../models/bill')

exports.createBill = async (req, res, next) => {
  try {
    const { title, price, group, isPaid } = req.body

    const bill = new Bill({ title, price, group, isPaid })

    await bill.save()
    res.status(201).send(bill)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.getBills = async (req, res, next) => {
  try {
    const bills = await req.user.getBills()
    res.status(201).send(bills)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.getBillsInGroup = async (req, res, next) => {
  try {
    const bills = await req.user.getBillsInGroup(req.params.id)
    res.status(201).send(bills)
  } catch (err) {
    res.status(500).send(err)
  }
}
