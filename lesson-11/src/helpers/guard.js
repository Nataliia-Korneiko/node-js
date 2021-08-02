const passport = require('passport');
require('../config/passport');
const { HttpCode } = require('./constants');

// промежуточное ПО
const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    // (err, user) - приходит из done в config -> passport.js -> return done(null, user);
    if (err || !user) {
      return next({
        status: HttpCode.FORBIDDEN,
        message: 'Forbidden',
      });
    }

    req.user = user; // на всех роутах user, в req.user лежит user
    // res.locals.user = user - переменная на текущем запросе
    // req.app.locals.vars - глобальная переменная (общее количество юзеро)

    return next();
  })(req, res, next);
};

module.exports = guard;
