const users = require("../models/User");
// const shortid = require("shortid");
const Joi = require("joi");

class UserController {
  getUsers(req, res) {
    res.json(users);
  }

  createUser(req, res) {
    const { body } = req;
    // const id = shortid();

    const createdUser = {
      ...body,
      id: users.length + 1,
      // id,
    };

    users.push(createdUser);
    // console.log("users:", users);

    res.json(createdUser); // отправляем обратно клиенту
  }

  validateCreateUser(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const validationResult = validationRules.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    next();
  }

  findUserIndex = (id) => {
    // const userId = +id;
    const userId = parseInt(id);

    return users.findIndex(({ id }) => id === userId);
  };

  updateUser = (req, res) => {
    const {
      params: { id },
    } = req;

    const userIndex = this.findUserIndex(id);

    const updatedUser = {
      ...users[userIndex], // сохраняем все старые поля
      ...req.body, // перезаписываем все поля, указанные при отправке в body
    };

    users[userIndex] = updatedUser;

    res.json(updatedUser);
  };

  validateUpdateUser(req, res, next) {
    const validationRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
    });

    const validationResult = validationRules.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }

    next();
  }

  deleteUser = (req, res) => {
    const {
      params: { id },
    } = req;

    const userIndex = this.findUserIndex(id);

    const deletedUser = users.splice(userIndex, 1);

    res.json(deletedUser);
  };

  validateUserId(req, res, next) {
    console.log("params:", req.params); // {id: "45"} - из postman при PUT localhost:8080/users/45
    const {
      params: { id },
    } = req;

    // console.log("id:", id); // строка
    const userId = parseInt(id); // из строки получаем число
    // console.log("userId:", userId); // число

    const userIndex = users.findIndex(({ id }) => id === userId); // findIndex - вернет id или -1

    if (userIndex === -1) {
      return res.status(400).send("User is not found");
    }

    next();
  }
}

module.exports = new UserController();
