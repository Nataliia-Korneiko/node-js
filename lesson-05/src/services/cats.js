const { CatsRepository } = require('../repository');
const db = require('../db/index.cjs');

class CatsService {
  constructor() {
    process.nextTick(async () => {
      const client = await db;
      this.repositories = {
        cats: new CatsRepository(client),
      };
    });
  }

  async getAll() {
    const data = await this.repositories.cats.getAll();
    return data;
  }

  async getById({ id }) {
    const data = await this.repositories.cats.getById(id);
    return data;
  }

  async create(body) {
    const data = await this.repositories.cats.create(body);
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
