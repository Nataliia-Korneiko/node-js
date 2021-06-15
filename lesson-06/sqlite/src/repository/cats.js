const { db } = require('../db/index.cjs');

class CatsRepository {
  constructor() {
    this.db = db;
  }
  async getAll() {
    const results = await this.db.models.cat.findAll({});
    return results;
  }
  async getById(id) {
    const result = await this.db.models.cat.findOne({ where: { id } });
    return result;
  }
  async create(body) {
    const result = await this.db.models.cat.create(body);
    return result;
  }
  async update(id, body) {
    const result = await this.db.models.cat.findOne({ where: { id } });
    if (!result) {
      return null;
    }
    return result.update(body);
  }
  async remove(id) {
    const result = await this.db.models.cat.findOne({ where: { id } });
    if (!result) {
      return null;
    }
    return result.destroy();
  }
}

module.exports = CatsRepository;
