const mongoose = require('mongoose')

const {
  Schema,
  Types: { ObjectId },
} = mongoose

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => value.includes('@'),
  },
  password: {
    type: String,
    required: true,
  },
  taskIds: [
    {
      type: ObjectId,
      ref: 'Task', // связывание 2 таблиц BD в mongoose, добавили метод populate('taskIds') в user.routes -> getUser()
    },
  ],
})

// users - создаст коллекцию в BD с маленькой буквы и во множественном числе, а если она существует, то привяжется к ней
const User = mongoose.model('User', UserSchema)

module.exports = User
