const mongoose = require('mongoose')

const { Schema } = mongoose

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
  tasks: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
})

// users - создаст коллекцию в BD с маленькой буквы и во множественном числе, а если она существует, то привяжется к ней
const User = mongoose.model('User', UserSchema)

module.exports = User
