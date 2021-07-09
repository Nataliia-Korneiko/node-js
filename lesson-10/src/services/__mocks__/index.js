const { cats } = require('./data-cat');

const mockGetAll = jest.fn(() => {
  return { cats, total: cats.length, limit: 5, offset: 0 };
});

const mockGetById = jest.fn((userId, { id }) => {
  const [cat] = cats.filter((el) => String(el._id) === String(id));
  return cat;
});

const mockCreate = jest.fn((userId, body) => {
  cats.push({ ...body, _id: '5f8382425ba83a4f1829ca4f' });
  return { ...body, _id: '5f8382425ba83a4f1829ca4f' };
});

const mockUpdate = jest.fn((userId, { id }, body) => {
  const [cat] = cats.filter((el) => String(el._id) === String(id));
  if (cat) {
    cat.name = body.name;
  }
  return cat;
});

const mockRemove = jest.fn((userId, { id }) => {
  const index = cats.findIndex((el) => String(el._id) === String(id));
  if (index !== -1) {
    const [cat] = cats.splice(index, 1);
    return cat;
  }
  return null;
});

const CatsService = jest.fn().mockImplementation(() => {
  return {
    getAll: mockGetAll,
    getById: mockGetById,
    create: mockCreate,
    update: mockUpdate,
    remove: mockRemove,
  };
});

const UsersService = jest.fn().mockImplementation(() => {
  return {
    create: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    updateAvatar: jest.fn(),
  };
});

const AuthService = jest.fn().mockImplementation(() => {
  return {
    login: jest.fn(),
    logout: jest.fn(),
  };
});

module.exports = {
  CatsService,
  UsersService,
  AuthService,
};
