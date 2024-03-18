const slugify = require('slugify')
const jwt = require('jsonwebtoken')

const main = async () => {
  const t = await jwt.sign(
    { groupId: '65f7b2f50421b8c39655f5d4', members: [{ userId: '65b3501c1897491e761fc98a', role: 'g:user' }] },
    'my_secret_key',
    {
      expiresIn: '1h'
    }
  )
  const decoded = jwt.verify(t, 'my_secret_key')
  console.log('🚀 ~ main ~ decoded:', decoded)
  console.log('🚀 ~ ) ~ t:', t)
}

main()
