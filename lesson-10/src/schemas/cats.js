const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2'); // для пагинации
const { Schema } = mongoose;

const catSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name cat is required'],
    },
    age: {
      type: Number,
      min: 1,
      max: 45,
      required: [true, 'Age cat is required'],
    },
    isVaccinated: {
      type: Boolean,
      default: false,
    },
    features: {
      type: Array,
      set: (data) => (!data ? [] : data), // приходит массив, если данных нет, вернет пустой массив
    },
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: 'user' },
  },
  { versionKey: false, timestamps: true } // versionKey: false - не отображает __v:0 в объекте, timestamps: true - следит за обновленными полями и добавляет в BD поля createdAt и updatedAt
);

catSchema.plugin(mongoosePaginate);

const Cat = mongoose.model('cat', catSchema); // cats - создаст коллекцию в BD, а если она существует, то привяжется к ней

module.exports = Cat;
