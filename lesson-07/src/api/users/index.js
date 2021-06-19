// .gitkeep - позволяет запушить пустую папку на GitHub, чтобы сохранить структуру проекта
const express = require('express');
const controllerUsers = require('../../controllers/users');
const router = express.Router();
const guard = require('../../helpers/guard');

router.post('/registration', controllerUsers.reg);
router.post('/login', controllerUsers.login);
router.post('/logout', guard, controllerUsers.logout); // не пускаем юзера к роутеру, если он не был залогинен

module.exports = router;
