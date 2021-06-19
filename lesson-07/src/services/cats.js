const { CatsRepository } = require('../repository');

class CatsService {
  constructor() {
    this.repositories = {
      cats: new CatsRepository(),
    };
  }

  async getAll() {
    const data = await this.repositories.cats.getAll();
    return data;
  }

  async getById({ id }) {
    const data = await this.repositories.cats.getById(id);
    return data;
  }

  // async create(body) {
  //   const data = await this.repositories.cats.create(body);
  //   return data;
  // }

  async create(body, userId) {
    const data = await this.repositories.cats.create(body, userId);
    return data;
  }

  async update({ id }, body) {
    const data = await this.repositories.cats.update(id, body);
    return data;
  }

  async remove({ id }) {
    const data = await this.repositories.cats.remove(id);
    return data;
  }
}

module.exports = CatsService;
