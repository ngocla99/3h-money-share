const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user) {
      return res.status(404).json({ error: { message: 'Invalid email or password!' } })
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      return res.status(400).json({ error: { message: 'Invalid email or password!' } })
    }

    const token = await user.generateToken()
    const userObject = user.toObject()
    delete userObject.password

    res.json({ ...userObject, token })
  } catch (err) {
    console.log('🚀 ~ exports.login= ~ err:', err)
    res.status(500).send(err)
  }
}

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const passwordHash = await bcrypt.hash(password, 12)

    const user = new User({ name, email, password: passwordHash })
    const token = await user.generateToken()
    await user.save()

    res.status(201).send({ ...user.toObject(), token })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).send({ error: { message: 'The email address is already in use!' } })
    }
    res.status(500).send(err)
  }
}

exports.getMe = async (req, res, next) => {
  console.log('🚀 ~ exports.getMe= ~ getMe:', req.user)
  res.json(req.user)
}
