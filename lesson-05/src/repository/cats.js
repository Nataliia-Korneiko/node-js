const { ObjectID } = require('mongodb');
const { HttpCode } = require('../helpers/constants');
const { ErrorHandler } = require('../helpers/errorHandler');

class CatsRepository {
  constructor(client) {
    this.collection = client.db().collection('cats'); // cats - создаст коллекцию в BD, а если она существует, то привяжется к ней
  }

  // приватный метод
  #getMongoId(id) {
    try {
      return ObjectID(id);
    } catch (e) {
      throw new ErrorHandler(
        HttpCode.BAD_REQUEST,
        `MongoDb _id: ${e.message}`,
        'Bad Request'
      );
    }
  }

  async getAll() {
    const results = await this.collection.find({}).toArray();
    return results;
  }

  async getById(id) {
    try {
      // const objectId = ObjectID(id); - при возникновении ошибки (неправильный id), отображается статус 500, а не 400, поэтому мы перемещаем ObjectID(id) в приватный метод класса (#getMongoId(id))
      const objectId = this.#getMongoId(id);
      const [result] = await this.collection.find({ _id: objectId }).toArray();
      return result;
    } catch (e) {
      e.status = 400;
      e.data = 'Bad Request';
      throw e;
    }
  }

  async create(body) {
    const record = {
      ...body,
      ...(body.isVaccinated ? {} : { isVaccinated: false }),
    };
    const {
      ops: [result],
    } = await this.collection.insertOne(record);
    return result;
  }

  async update(id, body) {
    // const objectId = ObjectID(id);
    const objectId = this.#getMongoId(id);
    const { value: result } = await this.collection.findOneAndUpdate(
      { _id: objectId },
      { $set: body },
      { returnOriginal: false } // false - для получения измененного объекта cat в mongodb
    );
    return result;
  }

  async remove(id) {
    // const objectId = ObjectID(id);
    const objectId = this.#getMongoId(id);
    const { value: result } = await this.collection.findOneAndDelete({
      _id: objectId,
    });
    return result;
  }
}

module.exports = CatsRepository;
