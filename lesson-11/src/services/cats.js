const { CatsRepository } = require('../repository');

class CatsService {
  constructor() {
    this.repositories = {
      cats: new CatsRepository(),
    };
  }

  async getAll(userId, query) {
    const data = await this.repositories.cats.getAll(userId, query);
    const { docs: cats, totalDocs: total, limit, offset } = data;
    return { cats, total, limit, offset };

    // const data = await this.repositories.cats.getAll(userId, query);
    // const { docs: cats, totalDocs: total, limit, offset } = data;
    // return { cats, total, limit, offset };
  }

  async getById(userId, { id }) {
    const data = await this.repositories.cats.getById(userId, id);
    return data;
  }

  // async create(body) {
  //   const data = await this.repositories.cats.create(body);
  //   return data;
  // }

  async create(userId, body) {
    const data = await this.repositories.cats.create(userId, body);
    return data;
  }

  async update(userId, { id }, body) {
    const data = await this.repositories.cats.update(userId, id, body);
    return data;
  }

  async remove(userId, { id }) {
    const data = await this.repositories.cats.remove(userId, id);
    return data;
  }
}

module.exports = CatsService;
