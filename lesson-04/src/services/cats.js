const { CatsRepository } = require('../repository');

class CatsService {
  constructor() {
    this.repositories = {
      cats: new CatsRepository(),
    };
  }

  getAll() {
    const data = this.repositories.cats.getAll();
    return data;
  }

  getById({ id }) {
    const data = this.repositories.cats.getById(id);
    return data;
  }

  create(body) {
    const data = this.repositories.cats.create(body);
    return data;
  }

  update({ id }, body) {
    console.log('CatsRepository -> update -> id:', id);
    const data = this.repositories.cats.update(id, body);
    return data;
  }

  remove({ id }) {
    const data = this.repositories.cats.remove(id);
    return data;
  }
}

module.exports = CatsService;
