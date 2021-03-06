const { Router } = require('express')
const UserController = require('./user.controller')

const router = Router()

// user
router.get('/', UserController.getUsers)
router.get('/:id', UserController.validateId, UserController.getUser)
router.post('/', UserController.createUser)
router.put('/:id', UserController.validateId, UserController.updateUser)
router.delete('/:id', UserController.validateId, UserController.deleteUser)

// task
router.post(
  '/:id/tasks',
  UserController.validateId,
  UserController.createUserTask
)
router.delete('/:userId/tasks/:taskId', UserController.deleteUserTask)

module.exports = router
