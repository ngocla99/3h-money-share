const Bill = require('../models/bill')
const mongodb = require('mongodb')
const { ObjectId } = mongodb

exports.createBill = async (req, res, next) => {
  try {
    const bill = new Bill({ ...req.body })
    await bill.save()
    res.status(201).send(bill)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.getBills = async (req, res, next) => {
  try {
    const bills = await req.user.getBills()
    res.status(200).send(bills)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.getBill = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.id)
    res.status(200).send(bill)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.getBillsInGroup = async (req, res, next) => {
  try {
    const bills = await req.user.getBillsInGroup(req.params.id)
    res.status(200).send(bills)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.updateBill = async (req, res, next) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, { ...req.body })
    res.status(200).send(bill)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.deleteBill = async (req, res, next) => {
  try {
    const bill = await Bill.deleteOne({ _id: new ObjectId(req.params.id) })
    res.status(200).send(bill)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.deleteBills = async (req, res, next) => {
  try {
    const bills = await Bill.deleteMany({ _id: { $in: req.body.bills.map((id) => new Object(id)) } })
    res.status(200).send(bills)
  } catch (err) {
    res.status(500).send(err)
  }
}
