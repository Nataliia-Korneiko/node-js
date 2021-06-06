const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const contactsRouter = require('./routes/contact.routes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
// app.use(cors())
app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((_req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/contacts',
    data: 'Not found',
  });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

module.exports = app;
