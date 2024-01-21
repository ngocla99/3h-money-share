const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if (!user) {
      res.status(404).send()
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      res.status(400).send({ error: { message: 'Invalid email or password!' } })
    }

    const token = await user.generateToken()

    res.send({ ...user.toObject(), token })
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    const passwordHash = await bcrypt.hash(password, 12)

    const user = new User({ name, email, password: passwordHash })
    await user.save()

    res.status(201).send(user)
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send({ error: { message: 'The email address is already in use!' } })
    }
    res.status(500).send(err)
  }
}
