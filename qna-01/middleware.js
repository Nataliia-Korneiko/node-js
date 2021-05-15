const express = require('express')

const PORT = 8080

const app = express()

// Применяется ко всем routes
app.use((req, res, next) => {
  console.log('Global middleware for all routes')
  next()
})

app.get(
  '/',
  (req, res, next) => {
    console.log('First middleware only for root route')
    next()
  },
  (req, res, next) => {
    console.log('Second middleware only for root route')
    next()
  },
  (req, res) => {
    res.send('root')
  }
)

app.get('/users', processUsers, (req, res) => {
  res.send('users')
})

app.get('/users/:id', processUsers, (req, res) => {
  res.send('user')
})

// Middleware для двух роутов
function processUsers(req, res, next) {
  next()
}

app.get('/comments', (req, res) => {
  res.send('comments')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})
