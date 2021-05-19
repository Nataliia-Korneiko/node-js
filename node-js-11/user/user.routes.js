const { Router } = require('express')
const UserController = require('./user.controller')

const router = Router()

// router.use(UserController.authorize) // вешает middleware сразу на все роуты '/'

// user
router.get('/', UserController.authorize, UserController.getUsers)
router.get(
  '/:id',
  UserController.authorize,
  UserController.validateId,
  UserController.getUser
)
// router.post('/', UserController.createUser)
router.post('/sign-up', UserController.signUpUser)
router.post('/login', UserController.login)
router.put(
  '/:id',
  UserController.authorize,
  UserController.validateId,
  UserController.updateUser
)
router.delete(
  '/:id',
  UserController.authorize,
  UserController.validateId,
  UserController.deleteUser
)

router.get('/verify/:token', UserController.verifyUser)

// task
router.post(
  '/:id/tasks',
  UserController.validateId,
  UserController.createUserTask
)
router.delete('/:userId/tasks/:taskId', UserController.deleteUserTask)

module.exports = router
