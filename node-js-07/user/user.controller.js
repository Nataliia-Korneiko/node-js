const {
  Types: { ObjectId },
} = require('mongoose') // проверка id из mongoose

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./User')

async function getUsers(_req, res) {
  // res.json({ message: 'users' })
  const users = await User.find()
  res.json(users) // получаем всех юзеров в postman
}

async function getUser(req, res) {
  const {
    params: { id },
  } = req

  const user = await User.findById(id) // findById - поиск по id

  if (!user) {
    //throw new Error("User isn't found!");
    return res.status(400).send("User isn't found!")
  }

  res.json(user)
}

async function createUser(req, res) {
  try {
    const { body } = req
    const hashedPassword = await bcrypt.hash(body.password, 14) // добавляем хеширование пароля

    // console.log('password:', hashedPassword)

    // const user = await User.create(body)
    const user = await User.create({
      ...body,
      password: hashedPassword,
    })
    res.json(user) // создаем юзера и получаем его в postman
  } catch (error) {
    res.status(400).send(error)
  }
}

async function updateUser(req, res) {
  const {
    params: { id },
  } = req

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true, // new: true - передает обновленного юзера, а не старого в postman
  }) // findByIdAndUpdate - метод для поиска id и обновления данных

  if (!updatedUser) {
    return res.status(400).send("User isn't found!")
  }

  res.json(updatedUser)
}

async function deleteUser(req, res) {
  const {
    params: { id },
  } = req

  const deletedUser = await User.findByIdAndDelete(id) // findByIdAndDelete - метод для поиска id и удаления юзера

  if (!deletedUser) {
    return res.status(400).send("User isn't found!")
  }

  res.json(deletedUser)
}

// validateId - middleware для валидации по id
function validateId(req, res, next) {
  const {
    params: { id },
  } = req

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Your id isn't valid!")
  }

  next()
}

async function createUserTask(req, res) {
  const {
    params: { id },
  } = req

  const user = await User.findByIdAndUpdate(
    id,
    {
      $push: {
        tasks: req.body,
      },
    },
    {
      new: true, // new: true - передает обновленного юзера, а не старого в postman
    }
  ) // findByIdAndUpdate - поиск по id и обновление юзера при создании таски

  if (!user) {
    return res.status(400).send("User isn't found!")
  }

  res.json(user)
}

async function deleteUserTask(req, res) {
  const {
    params: { userId, taskId },
  } = req

  const user = await User.findByIdAndUpdate(
    userId,
    {
      $pull: {
        tasks: {
          _id: taskId,
        },
      },
    },
    {
      new: true, // new: true - передает обновленного юзера, а не старого в postman
    }
  ) // findByIdAndUpdate - поиск по id и обновление юзера при удалении таски

  if (!user) {
    return res.status(400).send("User isn't found!")
  }

  res.json(user)
}

async function login(req, res) {
  const {
    body: { email, password },
  } = req

  // "email": "raeanne@gmail.com",
  // "password": "118902"

  const user = await User.findOne({
    email,
  }) // находим пользователя в BD по email

  if (!user) {
    return res.status(401).send('Authentication is failed!')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password) // проверяем соответствие пароля введенного юзером (password) и пароля в виде хеш из BD (user.password)
  console.log('isPasswordValid:', isPasswordValid) // true или false

  if (!isPasswordValid) {
    return res.status(401).send('Authentication is failed!')
  }

  const token = jwt.sign(
    {
      userId: user._id, // user._id - id из BD
    },
    process.env.JWT_SECRET
  )

  return res.json({ token }) // получаем token юзера в postman
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  validateId,
  createUserTask,
  deleteUserTask,
  login,
}
