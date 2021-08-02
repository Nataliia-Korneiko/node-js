const express = require('express');
const controllerCats = require('../../controllers/cats');
const router = express.Router();
const guard = require('../../helpers/guard'); // для получения доступа к котам только залогиненым юзерам
const {
  validateCreateCat,
  validateUpdateCat,
  validateUpdateStatusCat,
} = require('../../validation/cats');

// router.get('/', controllerCats.getAll);
// router.get('/:id', controllerCats.getById);
// router.post('/', validateCreateCat, controllerCats.create);
// router.put('/:id', validateUpdateCat, controllerCats.update);
// router.patch(
//   '/:id/vaccinated',
//   validateUpdateStatusCat,
//   controllerCats.updateStatus
// );
// router.delete('/:id', controllerCats.remove);

// или:
router
  .get('/', guard, controllerCats.getAll)
  .get('/:id', guard, controllerCats.getById)
  .post('/', guard, validateCreateCat, controllerCats.create)
  .put('/:id', guard, validateUpdateCat, controllerCats.update)
  .patch(
    '/:id/vaccinated',
    guard,
    validateUpdateStatusCat,
    controllerCats.updateStatus
  )
  .delete('/:id', guard, controllerCats.remove);

module.exports = router;
