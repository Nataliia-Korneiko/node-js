const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require('./user/user.routes')

dotenv.config()

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
}

function declareRoutes(app) {
  app.use('/users', userRouter) // используем '/users', чтобы не писать это в user.routes
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
