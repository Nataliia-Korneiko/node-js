const { UsersRepository } = require('../repository');
const jwt = require('jsonwebtoken'); // для token

require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  constructor() {
    this.repositories = {
      users: new UsersRepository(),
    };
  }

  async login({ email, password }) {
    const user = await this.repositories.users.findByEmail(email);

    // validPassword из userSchema
    if (!user || !user.validPassword(password)) {
      return null;
    }

    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // зашифровка token
    await this.repositories.users.updateToken(id, token); // token в BD - обновленный
    return token;
  }

  async logout(id) {
    const data = await this.repositories.users.updateToken(id, null); // token в BD - null
    return data;
  }
}

module.exports = AuthService;
