const cats = require('./cats');
const { HttpCode } = require('../helpers/constants');
const { CatsService } = require('../services');
const { cats: fakeData, newCat } = require('../services/__mocks__/data-cat');

jest.mock('../services'); // мокаем CatsService

describe('Unit testing cat controllers', () => {
  let req, res, next;

  beforeEach(() => {
    req = { user: { id: 1 } };
    res = {
      status: jest.fn().mockReturnThis(), // вернет this
      json: jest.fn((data) => data),
    };
    next = jest.fn();
  });

  test('should get all cats', async () => {
    const result = await cats.getAll(req, res, next);
    // console.log('result:', result);

    expect(CatsService).toHaveBeenCalled(); // вызов сервиса CatsService
    expect(result).toBeDefined();
    expect(result).toHaveProperty('status', 'success');
    expect(result).toHaveProperty('code', HttpCode.OK);
    expect(result).toHaveProperty('data');
  });

  test('should get error when get all cats', async () => {
    const result = await cats.getAll({}, res, next);

    expect(next).toHaveBeenCalledTimes(1); // вызов next 1 раз
  });

  test('should found cat by id', async () => {
    const { _id, name, age } = fakeData[0];
    req.params = { id: _id };
    const result = await cats.getById(req, res, next);

    expect(CatsService).toHaveBeenCalled();
    expect(result).toBeDefined(); // нужно поставить return в controllers
    expect(result.data.cat).toHaveProperty('_id', _id);
    expect(result.data.cat).toHaveProperty('name', name);
    expect(result.data.cat).toHaveProperty('age', age);
  });

  test('should found cat by wrong id', async () => {
    req.params = { id: 1 };
    const result = await cats.getById(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      status: HttpCode.NOT_FOUND,
      message: 'Not found cat',
      data: 'Not Found',
    });
  });

  test('should get error when get cat by id', async () => {
    const result = await cats.getById({}, res, next);

    expect(next).toHaveBeenCalledTimes(1); // вызов next 1 раз
  });

  // skip - пропускает тест
  test.skip('skip - should create new cat', async () => {
    const { name, age } = newCat;
    req.body = newCat;
    const result = await cats.create(req, res, next);

    expect(CatsService).toHaveBeenCalled();
    expect(result).toBeDefined(); // нужно поставить return в controllers
    expect(result.data.cat).toHaveProperty('_id');
    expect(result.data.cat).toHaveProperty('name', name);
    expect(result.data.cat).toHaveProperty('age', age);
  });

  test('should create new cat', async () => {
    const { name, age } = newCat;
    req.body = newCat;
    const result = await cats.create(req, res, next);

    expect(CatsService).toHaveBeenCalled();
    expect(result).toBeDefined(); // нужно поставить return в controllers
    expect(result.data.cat).toHaveProperty('_id');
    expect(result.data.cat).toHaveProperty('name', name);
    expect(result.data.cat).toHaveProperty('age', age);
  });

  test('should get error when create new cat', async () => {
    const result = await cats.create({}, res, next);

    expect(next).toHaveBeenCalledTimes(1); // вызов next 1 раз
  });

  test('should update cat', async () => {
    const { _id } = fakeData[0];
    req.params = { id: _id };
    const name = 'UpdateCat';
    req.body = { name };
    const result = await cats.update(req, res, next);

    expect(CatsService).toHaveBeenCalled();
    expect(result).toBeDefined(); // нужно поставить return в controllers
    expect(result.data.cat).toHaveProperty('_id', _id);
    expect(result.data.cat).toHaveProperty('name', name);
  });

  test('should update cat by wrong id', async () => {
    req.params = { id: 1 };
    const name = 'UpdateCat';
    req.body = { name };
    const result = await cats.update(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      status: HttpCode.NOT_FOUND,
      message: 'Not found cat',
      data: 'Not Found',
    });
  });

  test('should get error when update cat', async () => {
    const result = await cats.update({}, res, next);

    expect(next).toHaveBeenCalledTimes(1); // вызов next 1 раз
  });

  test('should remove cat by id', async () => {
    const { _id, name, age } = fakeData[0];
    req.params = { id: _id };
    const result = await cats.remove(req, res, next);

    expect(CatsService).toHaveBeenCalled();
    expect(result).toBeDefined(); // нужно поставить return в controllers
    expect(result.data.cat).toHaveProperty('_id', _id);
    expect(result.data.cat).toHaveProperty('name', name);
    expect(result.data.cat).toHaveProperty('age', age);
  });

  test('should remove cat by wrong id', async () => {
    req.params = { id: 1 };
    const result = await cats.remove(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith({
      status: HttpCode.NOT_FOUND,
      message: 'Not found cat',
      data: 'Not Found',
    });
  });

  test('should get error when remove cat', async () => {
    const result = await cats.remove({}, res, next);

    expect(next).toHaveBeenCalledTimes(1); // вызов next 1 раз
  });
});
