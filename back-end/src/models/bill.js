const mongoose = require('mongoose')
const { Schema } = mongoose

const billSchema = new Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      required: true,
      default: 'pending'
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: 'group'
    },
    payers: [
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
