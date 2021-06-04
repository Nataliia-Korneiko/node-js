const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const { articles } = require('../data/data.json');

router.get('/', (_req, res, _next) => {
  res.render('index', { title: 'My Site' });
});

router.get('/contact', (_req, res, _next) => {
  res.render('contact', { title: 'Conatct' });
});

// для отправки формы
router.post('/contact', async (req, res, _next) => {
  await fs.writeFile(
    path.join(__dirname, '..', 'data', 'message.json'),
    JSON.stringify(req.body, null, 2)
  );
  res.redirect('/'); // редирект на главную страницу
});

router.get('/blog', (_req, res, _next) => {
  res.render('blog', { title: 'My Blog', articles });
});

module.exports = router;
