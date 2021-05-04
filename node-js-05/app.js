const { MongoClient, ObjectID } = require('mongodb')
const dotenv = require('dotenv')
const express = require('express') // для роутов
const Joi = require('joi')

dotenv.config()

const DB_PASSWORD = process.env.DB_PASSWORD // пароль DB (admin) из .env
const DB_NAME = process.env.DB_NAME // название BD из .env
const PORT = process.env.PORT || 8080
const MONGO_URL = `mongodb+srv://admin:${DB_PASSWORD}@clustertest.iwx9a.mongodb.net/${DB_NAME}?retryWrites=true&w=majority` // URL BD

const app = express()
app.use(express.json()) // middleware для получения body
let users

start()

app.get('/users', getUsers)
app.post('/users', validateCreateUser, createUser)
app.put('/users/:id', updateUser)
app.delete('/users/:id', deleteUser)

app.listen(PORT, () => {
  console.log('Server is listening on port:', PORT)
})

async function start() {
  const client = await MongoClient.connect(MONGO_URL) // подключение к базе данных MongoDB (к кластеру)
  const db = client.db()

  users = db.collection('users')
}

async function getUsers(_req, res) {
  const data = await users.find().toArray()
  // console.log('data:', data) // получаем масив юзеров
  res.json(data) // отдаем данные, которые отображаются в postman
}

async function createUser(req, res) {
  const { body } = req
  const data = await users.insertOne(body) // insertOne - добавление одного юзера
  console.log('data:', data)

  // res.json(data) // ops:[{name: 'Vesna', email: 'vesna@gmail.com', password: '098765', _id: 60913385a176a449bcb8283d}]
  res.json(data.ops[0]) // [0] - index, отдаем объект с инфо о добавленном юзере в postman
}

function validateCreateUser(req, res, next) {
  const validationRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  })

  const result = validationRules.validate(req.body)

  if (result.error) {
    return res.status(400).send(result.error)
  }

  next()
}

async function updateUser(req, res) {
  const {
    params: { id },
  } = req

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("Your id isn't valid!")
  }

  const updatedUser = await users.updateOne(
    {
      _id: ObjectID(id), // поиск юзеро по id
    },
    {
      $set: req.body, // обновление инфо
    }
  ) // updateOne - обновление одного юзера, ObjectID(id) - id в BD

  if (!updatedUser.modifiedCount) {
    return res.status(400).send("User isn't found!")
  } // "matchedCount": 0, в postman, если id не существует

  // console.log('updatedUser:', updatedUser)
  res.json(updatedUser) // отдаем данные, которые отображаются в postman
}

async function deleteUser(req, res) {
  const {
    params: { id },
  } = req

  if (!ObjectID.isValid(id)) {
    return res.status(400).send("Your id isn't valid!")
  }

  const deletedUser = await users.deleteOne({
    _id: ObjectID(id),
  }) // deleteOne - удаление одного юзера

  if (!deletedUser.deletedCount) {
    return res.status(400).send("User isn't found!")
  } // "deletedCount": 0, в postman, если id не существует

  res.json(deletedUser) // отдаем данные, которые отображаются в postman
}
