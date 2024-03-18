const express = require('express')
const router = express.Router()
const groupController = require('../controllers/group')
const { isAuthenticated } = require('../middlewares/is-auth')

router.get('/accept-invitation', groupController.acceptInvitation)
router.post('/send-invitation', isAuthenticated, groupController.sendInvitation)

router
  .route('/:id', isAuthenticated)
  .get(groupController.getGroup)
  .patch(groupController.updateGroup)
  .delete(groupController.deleteGroup)

router.route('', isAuthenticated).get(groupController.getGroups).post(groupController.createGroup)

module.exports = router
