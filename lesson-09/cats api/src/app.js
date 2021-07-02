const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { HttpCode } = require('./helpers/constants');
const { ErrorHandler } = require('./helpers/errorHandler');
const { apiLimit, jsonLimit } = require('./config/rate-limit.json');
const routerUsers = require('./api/users');
const routerCats = require('./api/cats');

const app = express();

app.use(helmet()); // доставляет еще Headers 8 -> 17 в ответах postman
app.use(cors());
app.use(express.json({ limit: jsonLimit }));

// rateLimit - ограничение количества запросов на API (100 раз за 15 мин)
// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // 100 раз
// });

// app.use('/api/', apiLimiter); // only apply to requests that begin with /api/

app.use(
  '/api/',
  rateLimit({
    windowMs: apiLimit.windowMs,
    max: apiLimit.max,

    handler: (req, res, next) => {
      next(
        new ErrorHandler(
          HttpCode.BAD_REQUEST,
          'Вы исчерпали количество запросов за 15 минут'
        )
      );
    },
  })
);

app.use('/api/users', routerUsers);
app.use('/api/cats', routerCats);

app.use((req, res, _next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `Use api on routes ${req.baseUrl}/api/cats`,
    data: 'Not Found',
  });
});

app.use((err, _req, res, _next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.message,
    data: err.status === 500 ? 'Internal Server Error' : err.data,
  });
});

module.exports = app;
