const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/index');

// router.get('/', (_req, res) => {
//   const contacts = listContacts();

//   res.status(200).json({
//     status: 'success',
//     code: 200,
//     data: {
//       contacts,
//     },
//   });
// });

// ------------
router.get('/', async (_req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
      // contacts,
    });
  } catch (error) {
    next(error);
  }
});
// ------------

router.get('/:contactId', getContactById);
router.post('/', addContact);
router.delete('/:contactId', removeContact);
router.put('/:contactId', updateContact);

module.exports = router;
