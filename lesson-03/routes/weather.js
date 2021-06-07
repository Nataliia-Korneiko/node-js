const express = require('express');
const got = require('got');
const { query, validationResult } = require('express-validator');
const router = express.Router();
require('dotenv').config();

/* GET users listing. */
router.get(
  '/',
  [query('lat').isNumeric(), query('lon').isNumeric()], // валидация параметров lat и lon, isNumeric() - вернет true или false
  (req, res, next) => {
    const errors = validationResult(req);
    // проверка на успешность валидации
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  async (req, res, next) => {
    const { lat, lon } = req.query;
    try {
      const response = await got(
        'http://api.openweathermap.org/data/2.5/weather',
        {
          searchParams: {
            lat,
            lon,
            appid: process.env.API_KEY,
          },
        }
      );

      // const data = JSON.parse(response.body);
      // res.json(data);

      const {
        weather: [weather], // деструктуризация массива weather
        wind,
        name,
        sys: { country },
      } = JSON.parse(response.body);

      res.json({
        country,
        name,
        weather,
        wind,
      });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
