const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
const { Sex } = require('../helpers/constants');
const gravatar = require('gravatar'); // для подтягивания аватарки

const SALT_FACTOR = 6; // 6 - соль, количество проходов для зашифровки пароля (6-10)

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      default: 'Guest',
    },
    sex: {
      type: String,
      enum: {
        values: [Sex.MALE, Sex.FEMALE, Sex.NONE],
        message: "This gender isn't allowed",
      },
      default: Sex.NONE,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    // token - для logout
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: '250' }, true);
      },
    },
    idCloudAvatar: {
      type: String,
      default: null,
    },
    // isVerify - лучше чем verify
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

// pre - хук, перед сохранением выполнит хеширование пароля, стрелочная функция не подойдет
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(
    this.password,
    bcrypt.genSaltSync(SALT_FACTOR)
  );
  next();
});

// userSchema.path('email').validate(function (value) {
//   const re = /\S+@\S+\.\S+/
//   return re.test(String(value).toLowerCase())
// })

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema); // user - должен совпадать с реферальной ссылкой из catSchema -> ref: 'user'

module.exports = User;
