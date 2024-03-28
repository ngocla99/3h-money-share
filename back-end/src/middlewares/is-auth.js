var jwt = require('jsonwebtoken')
const mongodb = require('mongodb')
const User = require('../models/user')
const Group = require('../models/group')
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

exports.restrictTo = (role) => async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.groupId)
    if (!group) {
      return res.status(404).json({ message: 'Group not found.' })
    }

    const userInGroup = group.members.find((member) => member.userId.toString() === req.user._id.toString())
    if (!userInGroup && !role.includes(userInGroup?.role)) {
      return res.status(403).json({ message: 'You do not have permission to in this group.' })
    }
    
    req.group = group

    return next()
  } catch (err) {
    console.log('🚀 ~ exports.isAuthenticated= ~ err:', err)
  }

  return res.status(401).send({ error: { message: 'Please check your authorization!' } })
}
