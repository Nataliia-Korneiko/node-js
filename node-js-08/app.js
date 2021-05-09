const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const userRouter = require('./user/user.routes')
const taskRouter = require('./task/task.routes')

dotenv.config()

// mongoose.set('debug', true) // отображает все запросы в terminal

// 1. Init express server
// 2. Connect middleware
// 3. Declare routes
// 4. Connect to DB
// 5. Listen on port

const PORT = process.env.PORT || 8080

start()

function start() {
  const app = initServer() // для использования app в других функциях

  connectMiddleware(app)
  declareRoutes(app)
  connectToDb()
  listen(app)
}

function initServer() {
  return express()
}

function connectMiddleware(app) {
  app.use(express.json())
  app.use(morgan('combined'))
}

function declareRoutes(app) {
  app.use('/users', userRouter) // используем '/users', чтобы не писать это в user.routes
  app.use('/tasks', taskRouter)
}

// Подключение к DB
async function connectToDb() {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, // для использования новых фич
    useUnifiedTopology: true,
  })
}

function listen(app) {
  app.listen(PORT, () => {
    console.log('Server is listening on port:', PORT)
  })
}
