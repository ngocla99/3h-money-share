const mongoose = require('mongoose')
const { Schema } = mongoose
var jwt = require('jsonwebtoken')
const Bill = require('./bill')
const Group = require('./group')

const userSchema = new Schema({
  name: { type: String, required: [true, 'The user name is required!'] },
  email: { type: String, required: [true, 'The user email is required!'], unique: [true, 'The user name is unique!'] },
  password: {
    type: String,
    required: [true, 'The user password is required!'],
    min: [6, 'The user password must have at least 6 characters!']
  }
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()
  delete userObject.password

  return userObject
}

userSchema.methods.generateToken = async function () {
  const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10h' })
  return token
}

userSchema.methods.getBills = async function () {
  const groups = await this.getUserGroups()
  const groupIds = groups.map(({ _id }) => _id.toString())
  const bills = await Bill.find({ group: { $in: groupIds } }).populate('payers')

  return bills
}

userSchema.methods.getBillsInGroup = async function (groupId) {
  const bills = await Bill.find({ group: groupId })

  return bills
}

userSchema.methods.getOthers = async function () {
  const users = await User.find({ _id: { $nin: [this._id] } })
  return users
}

userSchema.methods.getUserGroups = async function () {
  const groups = await Group.find({ 'members.userId': this._id }).populate('members.userId')
  return groups
}

userSchema.methods.createGroup = async function ({ name, users }) {
  const includedUser = users.find((id) => id === this._id.toString())

  let mUsers = users
  if (!includedUser) {
    mUsers.push(this._id.toString())
  }

  mUsers = users.map((id) => {
    if (id === this._id.toString()) {
      return {
        userId: new mongoose.Types.ObjectId(id),
        isAdmin: true
      }
    }
    return {
      userId: new mongoose.Types.ObjectId(id)
    }
  })

  const group = new Group({ name, users: mUsers })
  await group.save()
  return group
}

const User = mongoose.model('user', userSchema)
module.exports = User
