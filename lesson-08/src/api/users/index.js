// .gitkeep - позволяет запушить пустую папку на GitHub, чтобы сохранить структуру проекта
const express = require('express');
const controllerUsers = require('../../controllers/users');
const router = express.Router();
const guard = require('../../helpers/guard');
const { createAccountLimiter } = require('../../helpers/rate-limit');

router.post('/registration', createAccountLimiter, controllerUsers.reg);
router.post('/login', controllerUsers.login);
router.post('/logout', guard, controllerUsers.logout); // не пускаем юзера к роутеру, если он не был залогинен

module.exports = router;
