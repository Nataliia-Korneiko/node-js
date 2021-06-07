const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const weatherRouter = require('./routes/weather');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // путь к шаблонам views
app.set('view engine', 'ejs'); // тип шаблона, установлен пакет ejs в package.json

process.env.NODE_ENV === 'development'
  ? app.use(logger('dev'))
  : app.use(logger('short'));

app.use(express.json({ limit: 50000 })); // 50000 - байты, ограничение json по передаче данных, чтобы не лег сервер
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser()); // куки
app.use(express.static(path.join(__dirname, 'public'))); // статика

// вывод даты в terminal
app.use((req, _res, next) => {
  const date = new Date();

  console.log(
    `${req.method} ${req.url} ${date.toLocaleDateString(
      'en-Us'
    )} ${date.toLocaleTimeString('en-Us')}`
  );
  next();
});

app.use('/', indexRouter);
app.use('/weather', weatherRouter);

// catch 404 and forward to error handler
app.use((req, _res, next) => {
  next(
    createError(404, `Извините по маршруту ${req.url} ничего не обнаружено`)
  );
});

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; // на проде, не показываем ошибки в юзеру, используем {}

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
