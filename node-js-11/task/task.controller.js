const Task = require('./Task')

async function getTasks(_req, res) {
  // res.json('tasks')
  const tasks = await Task.find()
  res.json(tasks) // получаем все tasks в postman
}

module.exports = {
  getTasks,
}
