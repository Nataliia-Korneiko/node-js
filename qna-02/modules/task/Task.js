const mongoose = require('mongoose')

const { Schema } = mongoose

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

// tasks - создаст коллекцию в BD с маленькой буквы и во множественном числе, а если она существует, то привяжется к ней
const Task = mongoose.model('Task', TaskSchema)

module.exports = Task
