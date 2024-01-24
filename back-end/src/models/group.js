const mongoose = require('mongoose')
const { Schema } = mongoose

const groupSchema = new Schema({
  name: { type: String, required: true },
  users: [
    {
      _id: false,
      userId: { type: Schema.Types.ObjectId, ref: 'user' },
      isAdmin: Boolean
    }
  ]
})

const Group = mongoose.model('group', groupSchema)
module.exports = Group
