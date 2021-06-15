const Cat = require('../schemas/cats');

class CatsRepository {
  constructor() {
    this.model = Cat;
  }

  async getAll() {
    const results = await this.model.find({});
    return results;
  }

  async getById(id) {
    const result = await this.model.findOne({ _id: id });
    return result;
  }

  async create(body) {
    const result = await this.model.create(body);
    return result;
  }

  async update(id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true } // new: true - в mongoose это аналог returnOriginal: false в mongodb
    );
    return result;
  }

  async remove(id) {
    // const result = await this.model.findByIdAndDelete({
    //   _id: id,
    // });
    const result = await this.model.findByIdAndRemove({
      _id: id,
    });
    return result;
  }
}

module.exports = CatsRepository;
