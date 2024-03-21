const express = require('express')
const router = express.Router()
const groupController = require('../controllers/group')
const { isAuthenticated } = require('../middlewares/is-auth')

router.get('/accept-invitation', groupController.acceptInvitation)

router.use(isAuthenticated)

router.post('/send-invitation', groupController.sendInvitation)

router
  .route('/:id')
  .get(groupController.getGroup)
  .patch(groupController.updateGroup)
  .delete(groupController.deleteGroup)

router.route('').get(groupController.getGroups).post(groupController.createGroup)

module.exports = router
