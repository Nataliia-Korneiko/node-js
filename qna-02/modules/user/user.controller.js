const {
  Types: { ObjectId },
} = require('mongoose') // проверка id из mongoose

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./User')
const Task = require('../task/Task')

async function getUsers(req, res) {
  // res.json({ message: 'users' })
  const currentUser = req.user // получаем текущего юзера, который приходит из authorize()
  console.log('currentUser:', currentUser)

  // const users = await User.find()
  const users = await User.aggregate([
    {
      $lookup: {
        from: 'tasks', // название коллекции
        localField: 'taskIds', // связь данных с другой коллекцией из users
        foreignField: '_id', // связь данных с другой коллекцией из tasks
        as: 'tasks', // название поля связи из двух таблиц в postman
      },
    },
  ]) // используем метод aggregate() вместо find() для связывание 2 таблиц BD (юзера с его задачами) в MongoDB (под капотом делает 1 запрос в BD)
  res.json(users) // получаем всех юзеров в postman
}

async function getUser(req, res) {
  const {
    params: { id },
  } = req

  // const user = await User.findById(id) // findById - поиск по id
  const user = await User.findById(id).populate('taskIds') // связывание 2 таблиц BD в mongoose, добавили ref: 'Task' в User.js (под капотом делает 2 запроса в BD)

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

  const task = await Task.create(req.body) // создается задача

  const user = await User.findByIdAndUpdate(
    id,
    {
      $push: {
        taskIds: task._id, // кидаем в масив только id задачи
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

  // Дописать логику по истечению времени жизни token
  const token = jwt.sign(
    {
      userId: user._id, // user._id - id из BD
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 60 * 60 * 1000, // время жизни token - 1 час
    }
  )

  const refreshToken = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 30 * 24 * 60 * 60 * 1000, // время жизни token - 1 месяц
    }
  )

  return res.json({ token, refreshToken }) // получаем token юзера в postman
}

async function authorize(req, res, next) {
  const authorizationHeader = req.get('Authorization') // получаем Header 'Authorization'
  if (!authorizationHeader) {
    return res.status(401).send('User is unauthorized!')
  }
  const token = authorizationHeader.replace('Bearer ', '') // replace() - это метод строки, заменяем 'Bearer ' на пустую строку и получаем только token

  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET) // проверяем token на валидность
    console.log('payload:', payload)
    const { userId } = payload
    console.log('userId:', userId)

    const user = await User.findById(userId) // ищем юзера по id в BD
    console.log('user:', user)

    if (!user) {
      return res.status(401).send('User is unauthorized!')
    }

    req.user = user // текущий юзер в getUsers()

    next()
  } catch (error) {
    // console.log('error:', error) // error: JsonWebTokenError { name: 'JsonWebTokenError', message: 'jwt malformed' }
    return res.status(401).send(error.message) // jwt malformed
  }
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
  authorize,
}
