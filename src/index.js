const express = require('express')
const bodyParser = require('body-parser')
require('./db/mongodb')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

app.use((req, res, next) => {
  next()
})

app.use('/auth', authRouter)
app.use('/user', userRouter)

app.listen(PORT, () => {
  console.log('listening on http://localhost:' + PORT)
})
