console.log('Studying new technique!')
var jwt = require('jsonwebtoken')
var token = jwt.sign({ _id: '65ab09fb0e38eb75494e912e' }, 'the secret', { expiresIn: '1h' })
console.log(token)

var decoded = jwt.verify(token, 'the secret')
console.log(decoded)
console.log(decoded.exp - decoded.iat)
