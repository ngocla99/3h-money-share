const mongoose = require('mongoose')
const { Schema } = mongoose

const billSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'group'
    },
    isPaid: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Bill = mongoose.model('bill', billSchema)
module.exports = Bill
