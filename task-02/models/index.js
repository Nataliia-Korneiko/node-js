const { promises: fsPromises } = require('fs');
const path = require('path');
const shortid = require('shortid');
const contactsPath = path.join(__dirname, './contacts.json');

// function listContacts() {
//   fsPromises
//     .readFile(contactsPath, 'utf-8')
//     .then((data) => {
//       const contacts = JSON.parse(data);

//       console.table(contacts);
//       return contacts;
//     })
//     .catch((error) => console.log('error:' + error));
// }

// ------------
const fs = require('fs/promises');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error(err.message);
  }
};
// ------------

function getContactById(contactId) {
  fsPromises
    .readFile(contactsPath, 'utf-8')
    .then((data) => {
      const contact = JSON.parse(data).find(
        ({ id }) => String(id) === contactId
      );
      console.log('contact:', contact);
      return contact;
    })
    .catch((error) => console.log('error:' + error));
}

function removeContact(contactId) {
  fsPromises
    .readFile(contactsPath, 'utf-8')
    .then((data) => {
      const contacts = JSON.parse(data);
      const contactDeleted = contacts.find(
        ({ id }) => String(id) === contactId
      );

      if (contactDeleted) {
        contacts.filter(({ id }) => String(id) !== contactId);
        const contactsUpdated = JSON.stringify(contacts);

        fsPromises.writeFile(contactsPath, contactsUpdated);
        console.log('contactDeleted:', contactDeleted);
        return contactDeleted;
      }
    })
    .catch((error) => console.log('error:' + error));
}

function addContact({ name, email, phone }) {
  const id = shortid();
  const newContact = {
    id,
    name,
    email,
    phone,
  };

  fsPromises
    .readFile(contactsPath, 'utf-8')
    .then((data) => {
      const contacts = JSON.parse(data);
      const contactsUpdated = JSON.stringify([...contacts, newContact]);

      fsPromises.writeFile(contactsPath, contactsUpdated);
      console.log('newContact:', newContact);
      return newContact;
    })
    .catch((error) => console.log('error:' + error));
}

function updateContact(contactId, body) {
  fsPromises
    .readFile(contactsPath, 'utf-8')
    .then((data) => {
      const contacts = JSON.parse(data);
      const contact = contacts.find(
        ({ id }) => String(id) === String(contactId)
      );

      if (contact) {
        const contactUpdated = {
          ...contact,
          ...body,
        };

        contacts.filter(({ id }) => String(id) !== String(contactId));
        const contactsUpdated = JSON.stringify([...contacts, contactUpdated]);

        fsPromises.writeFile(contactsPath, contactsUpdated);
        console.log('contactUpdated:', contactUpdated);
        return contactUpdated;
      }
    })
    .catch((error) => console.log('error:' + error));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
