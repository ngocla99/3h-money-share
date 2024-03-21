var jwt = require('jsonwebtoken')
const mongodb = require('mongodb')
const User = require('../models/user')
const { ObjectId } = mongodb

exports.isAuthenticated = async (req, res, next) => {
  if (req.header && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    try {
      const { _id } = await jwt.verify(token, process.env.JWT_SECRET_KEY)

      const user = await User.findOne({ _id: new ObjectId(_id) })

      if (!user) {
        return res.status(401).send({ error: { message: 'Please check your authorization!' } })
      }

      req.user = user

      return next()
    } catch (err) {
      console.log('🚀 ~ exports.isAuthenticated= ~ err:', err)
    }
  }
  return res.status(401).send({ error: { message: 'Please check your authorization!' } })
}
