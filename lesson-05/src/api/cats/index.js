const express = require('express');
const controllerCats = require('../../controllers/cats');
const router = express.Router();

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
  .get('/', controllerCats.getAll)
  .get('/:id', controllerCats.getById)
  .post('/', validateCreateCat, controllerCats.create)
  .put('/:id', validateUpdateCat, controllerCats.update)
  .patch(
    '/:id/vaccinated',
    validateUpdateStatusCat,
    controllerCats.updateStatus
  )
  .delete('/:id', controllerCats.remove);

module.exports = router;
