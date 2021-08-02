// .gitkeep - позволяет запушить пустую папку на GitHub, чтобы сохранить структуру проекта
const express = require('express');
const controllerUsers = require('../../controllers/users');
const router = express.Router();
const guard = require('../../helpers/guard');
const { createAccountLimiter } = require('../../helpers/rate-limit');
const upload = require('../../helpers/multer');

router.get('/current', guard, controllerUsers.current);
router.get('/verify/:token', controllerUsers.verify); // ссылка из email
router.post('/registration', createAccountLimiter, controllerUsers.reg);
router.post('/login', controllerUsers.login);
router.post('/logout', guard, controllerUsers.logout); // не пускаем юзера к роутеру, если он не был залогинен
router.patch(
  '/avatars',
  guard,
  upload.single('avatar'),
  controllerUsers.avatars
);

module.exports = router;
