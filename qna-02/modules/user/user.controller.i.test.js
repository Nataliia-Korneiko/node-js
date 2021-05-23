const request = require('supertest') // для Service Integration/System Tests
const app = require('../../app')

describe('Should test /users api', () => {
  describe('Should test GET /users route', () => {
    it('Should test that without token 401 status code is returned', async () => {
      const response = await request(app).get('/users')
      expect(response.statusCode).toBe(401)
    })
    it('Should test that without a valid token 401 status code is returned', async () => {
      const response = await request(app)
        .get('/users')
        .set(
          'Authorization',
          'Bearer ey2hb10GOJfIUz4I1i8InR15qCYIu6IpXVC9.eyJ1c2VySQiiI2Dk3UZUcxZEzkMDwMzsYNGhE3gWr9JiME7iLC6pY1XQOjE22jA31NQ5yMB6.W387mX2sHMbZIp8vu3PMdvjhTyH17gto6jLwGkj4l90'
        )

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

    it('Should test that /users return data in the correct format', async () => {
      const response = await request(app)
        .get('/users/6097d61ca30003634a79bb3b')
        .set('Authorization', `Bearer ${process.env.USER_TOKEN}`)
      expect(typeof response.body.email).toBe('string')
    })
  })
})
