const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  name: { type: String, required: [true, 'The user name is required!'] },
  email: { type: String, required: [true, 'The user email is required!'], unique: [true, 'The user name is unique!'] },
  password: {
    type: String,
    required: [true, 'The user password is required!'],
    min: [6, 'The user password must have at least 6 characters!']
  },
  tokens: [String]
})

const User = mongoose.model('user', userSchema)
module.exports = User
