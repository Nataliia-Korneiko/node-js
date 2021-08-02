const rateLimit = require('express-rate-limit');
const { HttpCode } = require('./constants');
const { accountLimit } = require('../config/rate-limit.json');

const createAccountLimiter = rateLimit({
  windowMs: accountLimit.windowMs, // 1 час
  max: accountLimit.max, // за 1 час можно создать только 2 аккаунта с одного IP

  handler: (req, res, next) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message:
        'С вашего IP-адреса исчерпан лимит создания аккаунтов за один час. Попробуйте позже!',
    });
  },
});

module.exports = { createAccountLimiter };
