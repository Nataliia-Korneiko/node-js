const dotenv = require('dotenv')
const { authorize } = require('./user.controller')
const User = require('./User')

describe('Should test authorize middleware', () => {
  let responseMock
  let nextMock

  // Выполниться перед всеми тестами
  beforeAll(() => {
    dotenv.config()
    jest.mock('./User') // для const user = await User.findById(userId) в user.controller.js
    const response = {
      test: 'data',
    }
    // User.findById.mockResolvedValue(response)
    // или:
    User.findById = jest.fn(() => Promise.resolve(response))
  })

  // Выполниться перед каждым тестом
  beforeEach(() => {
    responseMock = {
      status: jest.fn(() => {
        return {
          send: jest.fn(),
        }
      }),
    }
    nextMock = jest.fn()
  })

  it('User token is missed', () => {
    // Реализовываем функционал authorize(req, res, next) из user.controller.js
    const requestMock = {
      get: jest.fn(),
    }

    // Выносим в beforeAll()
    // const responseMock = {
    //   status: jest.fn(() => {
    //     return {
    //       send: jest.fn(),
    //     }
    //   }),
    // }

    // Выносим в beforeAll()
    // const nextMock = jest.fn()

    authorize(requestMock, responseMock, nextMock)

    // console.log(responseMock.status.mock) // { calls: [ [ 401 ] ], instances: [ { status: [Function] } ], invocationCallOrder: [ 2 ], results: [ { type: 'return', value: [Object] } ]}

    expect(responseMock.status.mock.calls.length).toBe(1) // ожидаем, что функция status будет вызвана 1 раз
    expect(responseMock.status.mock.calls[0][0]).toBe(401) // ожидаем, что статус будет 401

    // console.log(responseMock.status.mock.results[0].value)

    const sendMock = responseMock.status.mock.results[0].value.send

    expect(sendMock.mock.calls.length).toBe(1) // ожидаем, что функция send будет вызвана 1 раз
    expect(sendMock.mock.calls[0][0]).toBe('User is unauthorized!') // ожидаем, что аргумент  будет 'User is unauthorized!'
  })

  it('User token is invalid', () => {
    const requestMock = {
      get: jest.fn(() => 'fe3dfd3fdf3f4vce3fv4gebvfevd3v3r'), // пишем невалидный token
    }

    // Выносим в beforeAll()
    // const responseMock = {
    //   status: jest.fn(() => {
    //     return {
    //       send: jest.fn(),
    //     }
    //   }),
    // }

    // Выносим в beforeAll()
    // const nextMock = jest.fn()

    authorize(requestMock, responseMock, nextMock)

    expect(responseMock.status.mock.calls.length).toBe(1)
    expect(responseMock.status.mock.calls[0][0]).toBe(401)

    const sendMock = responseMock.status.mock.results[0].value.send

    // console.log(sendMock.mock.calls[0][0]) // jwt malformed

    expect(sendMock.mock.calls.length).toBe(1)
    expect(sendMock.mock.calls[0][0]).toBe('jwt malformed')
  })

  it('User token is valid', async () => {
    // получаем token при post запросе login в postman
    const requestMock = {
      get: jest.fn(
        () =>
          // указать token в '' или взять из .env:
          process.env.USER_TOKEN
      ),
    }

    // Выносим в beforeAll()
    // const responseMock = {
    //   status: jest.fn(() => {
    //     return {
    //       send: jest.fn(),
    //     }
    //   }),
    // }

    // Выносим в beforeAll()
    // const nextMock = jest.fn()

    await authorize(requestMock, responseMock, nextMock) // добавляем async await для асинхронного поведения и вызова next

    expect(nextMock.mock.calls.length).toBe(1) // ожидаем, что функция next будет вызвана 1 раз
  })
})
