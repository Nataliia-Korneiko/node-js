const request = require('supertest') // для Service Integration/System Tests
const app = require('../app')

describe('Should test /users api', () => {
  describe('Should test GET /users route', () => {
    it('Should test that without token 401 status code is returned', async () => {
      const response = await request(app).get('/users')
      expect(response.statusCode).toBe(401)
    })
    it('Should test that on success status code 200 is returned', async () => {
      const response = await request(app)
        .get('/users')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
      expect(response.statusCode).toBe(200)
    })

    it('Should test that /users return data', async () => {
      const response = await request(app)
        .get('/users/6097d61ca30003634a79bb3b')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
      expect(response.body.email).toBe('rj@gmail.com')
    })
  })
})
