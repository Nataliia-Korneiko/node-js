const User = require('../schemas/user');

class UsersRepository {
  constructor() {
    this.model = User;
  }

  async findById(id) {
    const result = await this.model.findOne({ _id: id });
    return result;
  }

  async findByEmail(email) {
    const result = await this.model.findOne({ email });
    return result;
  }

  async findByField(field) {
    const result = await this.model.findOne(field);
    return result;
  }

  async create(body) {
    const user = new this.model(body);
    return user.save();
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token });
  }

  async updateAvatar(id, avatar, idCloudAvatar) {
    await this.model.updateOne({ _id: id }, { avatar, idCloudAvatar });
  }

  async getAvatar(id) {
    const { avatar, idCloudAvatar } = await this.model.findOne({ _id: id });
    return { avatar, idCloudAvatar };
  }

  async getCurrentUser(id) {
    const user = await this.model.findOne(
      { _id: id },
      '_id name email sex avatar createdAt'
    );
    return user;
  }
}

module.exports = UsersRepository;
