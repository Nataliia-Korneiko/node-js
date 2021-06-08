const { v4: uuid } = require('uuid');
const db = require('../db/index.cjs');

// работа с db
class CatsRepository {
  getAll() {
    return db.get('cats').value();
  }

  getById(id) {
    return db.get('cats').find({ id }).value();
  }

  create(body) {
    const id = uuid();
    const record = {
      id,
      ...body,
      ...(body.isVaccinated ? {} : { isVaccinated: false }),
    };

    db.get('cats').push(record).write();
    return record;
  }

  update(id, body) {
    const record = db.get('cats').find({ id }).assign(body).value();

    db.write();
    return record.id ? record : null;
  }

  remove(id) {
    const [record] = db.get('cats').remove({ id }).write();

    return record;
  }
}

module.exports = CatsRepository;
