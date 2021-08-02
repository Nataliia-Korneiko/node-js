const { HttpCode } = require('../src/helpers/constants');
const { cats, newCat } = require('../src/services/__mocks__/data-cat');
const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/services'); // мокаем CatsService
jest.mock('../src/helpers/guard.js', () => {
  return (req, res, next) => {
    req.user = { id: 1 };
    next();
  };
});

describe('should handle get request api/cats', () => {
  test('should return 200 status for get all cats', async (done) => {
    const res = await request(app)
      .get('/api/cats')
      .set('Accept', 'application/json');
    // console.log('res.body:', res.body);

    expect(res.status).toEqual(HttpCode.OK); // toEqual - равно
    expect(res.body).toBeDefined();
    expect(res.body.data.cats).toBeInstanceOf(Array);
    done();
  });

  test('should return 200 status for get cat by id', async (done) => {
    const cat = cats[0];
    const res = await request(app)
      .get(`/api/cats/${cat._id}`)
      .set('Accept', 'application/json');

    expect(res.status).toEqual(HttpCode.OK);
    expect(res.body).toBeDefined();
    expect(res.body.data.cat._id).toBe(cat._id);
    done();
  });

  test('should return 404 status for find cat by wrong id', async (done) => {
    const cat = { _id: 123456 };
    const res = await request(app)
      .get(`/api/cats/${cat._id}`)
      .set('Accept', 'application/json');
    // console.log('res.body:', res.body);

    expect(res.status).toEqual(HttpCode.NOT_FOUND);
    expect(res.body).toBeDefined();
    done();
  });

  test('should return 201 status for create cat', async (done) => {
    const res = await request(app)
      .post(`/api/cats`)
      .send(newCat)
      .set('Accept', 'application/json');
    // console.log('res.body:', res.body);

    expect(res.status).toEqual(HttpCode.CREATED);
    expect(res.body).toBeDefined();
    expect(res.body.data.cat.name).toBe(newCat.name);
    expect(res.body.data.cat.age).toBe(newCat.age);
    done();
  });
});
