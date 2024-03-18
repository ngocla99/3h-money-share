const { default: slugify } = require('slugify')
const Group = require('../models/group')
const mongodb = require('mongodb')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { sendNotiSignupSuccess, sendGroupInvation } = require('../utils/nodemailer')
const { ObjectId } = mongodb

exports.getGroups = async (req, res, next) => {}

exports.getGroup = async (req, res, next) => {
  try {
    const data = await Group.findById(req.params.id)
    res.json(data)
  } catch (err) {
    console.error('Error occured:', err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

exports.createGroup = async (req, res, next) => {
  try {
    const { name, imageUrl, slug } = req.body

    const group = new Group({
      name,
      imageUrl,
      slug: slug || slugify(name, { lower: true }),
      members: [
        {
          userId: req.user._id.toString(),
          role: 'g:admin'
        }
      ]
    })

    const data = await group.save()
    res.status(201).json(data)
  } catch (err) {
    console.error('Error occured:', err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

exports.updateGroup = async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id)

    const userInGroup = group.members.find((member) => member.userId.toString() === req.user._id.toString())
    if (!userInGroup && userInGroup?.role !== 'g:admin') {
      res.status(403).json({ message: 'You do not have permission to update this group.' })
    }

    const mMembers = group.members.map((member) => {
      const mMember = req.body.members.find((m) => m.userId === member.userId.toString())
      return mMember ?? member
    })

    await Group.updateOne(
      { _id: new Object(req.params.id) },
      {
        ...req.body,
        members: mMembers.map((member) => ({ ...member, userId: new ObjectId(member.userId) }))
      },
      { runValidators: true }
    )

    res.json({ message: 'Group updated successfully.' })
  } catch (err) {
    console.error('Error occured:', err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

exports.deleteGroup = async (req, res, next) => {
  try {
    await Group.deleteOne({ _id: new ObjectId(req.params.id) })
    res.json({ message: 'Users removed to group successfully.' })
  } catch (err) {
    console.error('Error occured:', err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

exports.sendInvitation = async (req, res, next) => {
  try {
    const { members, groupId } = req.body

    const group = await Group.findById(groupId)
    if (!group) {
      return res.status(404).json({ message: 'Group not found.' })
    }

    const users = await User.find({ email: { $in: members.map((member) => member.email) } })
    if (!users || users.length !== members.length) {
      return res.status(404).json({ message: 'One or more users not found.' })
    }

    for (const member of members) {
      const data = {
        groupId,
        members: [
          {
            userId: users.find((user) => user.email === member.email)._id.toString(),
            role: member.role
          }
        ]
      }
      const token = await jwt.sign(data, process.env.JWT_SECRET_KEY)
      sendGroupInvation({ user: req.user, group, to: member.email, token })
    }

    res.json({ message: 'Users added to group successfully.' })
  } catch (err) {
    console.error('Error occured1:', err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}

exports.acceptInvitation = async (req, res, next) => {
  const { token } = req.query
  const { groupId, members: membersData } = jwt.verify(token, process.env.JWT_SECRET_KEY)
  if (!groupId || !membersData) {
    return res.status(404).json({ message: 'Not found.' })
  }

  try {
    const group = await Group.findById(groupId)
    if (!group) {
      return res.status(404).json({ message: 'Group not found.' })
    }

    const members = membersData.map((member) => ({ ...member, userId: new ObjectId(member.userId) }))
    const userIds = members.map((member) => member.userId)
    const users = await User.find({ _id: { $in: userIds } })

    if (!users || users.length !== userIds.length) {
      return res.status(404).json({ message: 'One or more users not found.' })
    }

    const userAlreadyInGroup = group.members.filter((member) =>
      userIds.map((id) => id.toString()).includes(member.userId.toString())
    )

    if (userAlreadyInGroup.length > 0) {
      return res.status(404).json({ message: 'One or more users are already members of the group.' })
    }

    group.members = [...group.members, ...members]
    await group.save()

    res.json({ message: 'Users added to group successfully.' })
  } catch (err) {
    console.error('Error occured1:', err)
    res.status(500).json({ message: 'Internal server error.' })
  }
}
