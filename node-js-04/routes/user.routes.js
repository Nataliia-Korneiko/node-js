const { Router } = require("express");
const UserController = require("../controllers/user.controller");

const router = Router();

// "/users" - используем строку в app.js initRoutes()
// router.get("/users");
// router.post("/users");
// router.put("/users/:id");
// router.delete("/users/:id");

// -----------------------
router.get("/", UserController.getUsers);
router.post("/", UserController.validateCreateUser, UserController.createUser);
router.put(
  "/:id",
  UserController.validateUserId,
  UserController.validateUpdateUser,
  UserController.updateUser
);
router.delete("/:id", UserController.validateUserId, UserController.deleteUser);

module.exports = router;
