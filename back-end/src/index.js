const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { isAuthenticated } = require('./middlewares/is-auth')
require('./db/mongodb')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const authRouter = require('./routes/auth')
const groupRouter = require('./routes/group')
const billRouter = require('./routes/bill')

app.use((req, res, next) => {
  next()
})

app.use('/auth', authRouter)
app.use('/groups', groupRouter)
app.use('/bills', isAuthenticated, billRouter)

app.listen(PORT, () => {
  console.log('listening on http://localhost:' + PORT)
})
