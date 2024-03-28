const express = require('express')
const router = express.Router()
const groupController = require('../controllers/group')
const { isAuthenticated, restrictTo } = require('../middlewares/is-auth')

router.get('/accept-invitation', groupController.acceptInvitation)

router.use(isAuthenticated)

router.post('/send-invitation', groupController.sendInvitation)

router
  .route('/:groupId')
  .get(groupController.getGroup)
  .patch(restrictTo('g:admin'), groupController.updateGroup)
  .delete(groupController.deleteGroup)

router.patch('/:groupId/delete-members', restrictTo('g:admin'), groupController.deleteMembersFromGroup)

router.route('').get(groupController.getUserGroups).post(groupController.createGroup)

module.exports = router
