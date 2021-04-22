const express = require("express");
const Joi = require("joi");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const cors = require("cors");

// Устанавливаем:
// 1. Joi
// 2. node-fetch - аналог axios
// 3. dotenv - для ключа в .env
// 4. cors
// 5. для heroku: меняем в package.json "start" -> меняем PORT -> переходим на heroku -> Settings -> Reveal Config Vars -> записываем OPEN_WEATHER_API_KEY

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

const API_KEY = process.env.OPEN_WEATHER_API_KEY;
// console.log("API_KEY:", API_KEY);

// middleware для всех запросов
app.use(
  cors({
    origin: "localhost:8080",
    // origin: "*", - публичный для всех
  })
);

// делаем запрос в postman
app.get("/weather", validateWeatherParams, async (req, res) => {
  // console.log("query:", req.query); // query: { lat: '54', lon: '45' }

  const {
    query: { lat, lon },
  } = req;

  // res.send(req.query); // отправляет ответ пользователю

  // -----------------------
  const result = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  const data = await result.json();
  res.json(data); // отправляет ответ пользователю в формате json
});

// Валидация параметров lat и lon
// function validateWeatherParams(req, res, next) {
//   const {
//     query: { lat, lon },
//   } = req;

//   if (typeof lat !== "string" || typeof lon !== "string") {
//     return res.status(400).send("One of geo coordinates is missed!");
//   }
//   next();
// }

// -----------------------
function validateWeatherParams(req, res, next) {
  const validationRules = Joi.object({
    lat: Joi.string().required(),
    lon: Joi.string().required(),
  });

  const validationResult = validationRules.validate(req.query);
  console.log("validationResult:", validationResult); // validationResult: { value: { lat: '54', lon: '45' }}

  // error: [Error [ValidationError]: "lon" is required] - ответ на запрос без "lon"
  if (validationResult.error) {
    console.log("Error!");
    return res.status(400).send(validationResult.error);
  }

  console.log("After validation!"); // return делает выход из fn, поэтому лог не выводиться

  next();
}

app.listen(PORT, () => {
  console.log("Server is listening on port:", PORT);
});
