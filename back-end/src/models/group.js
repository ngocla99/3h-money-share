const mongoose = require('mongoose')
const { Schema } = mongoose

const groupSchema = new Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String },
    slug: { type: String, unique: [true, 'The slug group is unique'] },
    maxAllowedMembership: { type: Number, default: 5 },
    members: [
      {
        type: new mongoose.Schema(
          {
            _id: false,
            userId: { type: Schema.Types.ObjectId, ref: 'user' },
            role: { type: String, enum: ['g:admin', 'g:user'], required: true }
          },
          { timestamps: true }
        )
      }
    ],
    pendingInvitations: [
      {
        _id: false,
        userId: { type: Schema.Types.ObjectId, ref: 'user' }
      }
    ]
  },
  {
    timestamps: true
  }
)

groupSchema.path('members').validate(function (members) {
  return members.some((member) => member.role === 'g:admin')
}, 'At least one member must have the role of admin.')

const Group = mongoose.model('group', groupSchema)

module.exports = Group
