const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { UsersService } = require('../services');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const params = {
  secretOrKey: SECRET_KEY,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // считывает Headers и достает token, затем ложет в payload
};

passport.use(
  new Strategy(params, async (payload, done) => {
    try {
      // console.log(
      //   '🚀 ~ file: passport.js ~ line 17 ~ newStrategy ~ payload',
      //   payload
      // );

      const service = new UsersService();
      const user = await service.findById(payload.id); // id приходит из services -> auth.js -> const payload = { id };

      // console.log(
      //   '🚀 ~ file: passport.js ~ line 25 ~ newStrategy ~ user',
      //   user
      // );

      if (!user) {
        return done(new Error('User not found'));
      }

      // если у юзера нет token
      if (!user.token) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      done(e);
    }
  })
);
