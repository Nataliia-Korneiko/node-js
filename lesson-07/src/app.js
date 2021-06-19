const express = require('express');
const cors = require('cors');
const { HttpCode } = require('./helpers/constants');
const routerUsers = require('./api/users');
const routerCats = require('./api/cats');

const app = express();

app.use(cors());
app.use(express.json());

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
