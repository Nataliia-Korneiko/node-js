const Cat = require('../schemas/cats');

class CatsRepository {
  constructor() {
    this.model = Cat;
  }

  // query = { limit = 5, offset = 0, sortBy, sortByDesc, filter }
  // skip - это offset
  // filter - это select

  async getAll(userId, { limit = 10, offset = 0, sortBy, sortByDesc, filter }) {
    // const sort = null;
    // if (sortBy) {
    //   sort = {
    //     [`${sortBy}`]: 1,
    //   };
    // }
    // if (sortByDesc) {
    //   sort = {
    //     [`${sortByDesc}`]: -1,
    //   };
    // }

    const result = await this.model.paginate(
      { owner: userId },
      {
        limit,
        offset,
        sort: {
          ...(sortBy ? { [`${sortBy}`]: 1 } : {}), // 1 - сортировка по возрастанию
          ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}), // -1 - сортировка по убыванию
        },
        select: filter ? filter.split('|').join(' ') : '',
        populate: {
          path: 'owner',
          select: 'name email sex -_id', // -id - не отображает _id в объекте юзера
        },
      }
    );
    return result;
  }

  async getById(userId, id) {
    const result = await this.model
      .findOne({ _id: id, owner: userId })
      .populate({
        path: 'owner',
        select: 'name email sex -_id',
      });
    return result;
  }

  // async create(body) {
  //   const result = await this.model.create(body);
  //   return result;
  // }

  async create(userId, body) {
    const result = await this.model.create({ ...body, owner: userId }); // при создании кота, привязываем id юзера к коту и в postman появляеться объект кота с полем owner
    return result;
  }

  async update(userId, id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true } // new: true - в mongoose это аналог returnOriginal: false в mongodb
    );
    return result;
  }

  async remove(userId, id) {
    // const result = await this.model.findByIdAndDelete({
    //   _id: id,
    // });
    const result = await this.model.findByIdAndRemove({
      _id: id,
      owner: userId,
    });
    return result;
  }
}

module.exports = CatsRepository;
