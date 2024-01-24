exports.getMe = async (req, res, next) => {
  return req.user
}

exports.getOthers = async (req, res, next) => {
  try {
    const others = await req.user.getOthers()

    res.send(others)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.getGroups = async (req, res, next) => {
  try {
    const groups = await req.user.getGroups()

    res.status(201).send(groups)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.createGroup = async (req, res, next) => {
  try {
    const { name, users } = req.body

    const group = await req.user.createGroup({ name, users })

    res.status(201).send(group)
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.addUserToGroup = async (req, res, next) => {
  try {
    console.log('1')
  } catch (err) {
    res.status(500).send(err)
  }
}

exports.deleteUserFromGroup = async (req, res, next) => {}
