const { promises: fsPromises } = require("fs");
const path = require("path");
const shortid = require("shortid");
const contactsPath = path.join(__dirname, "./db/contacts.json");

function listContacts() {
  fsPromises
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      console.table(contacts);
    })
    .catch((error) => console.log("error:" + error));
}

function getContactById(contactId) {
  fsPromises
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const contact = JSON.parse(data).find(({ id }) => id === contactId);
      console.log("contact:", contact);
    })
    .catch((error) => console.log("error:" + error));
}

function removeContact(contactId) {
  fsPromises
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data).filter(({ id }) => id !== contactId);
      const updatedContacts = JSON.stringify(contacts);

      fsPromises.writeFile(contactsPath, updatedContacts);
      listContacts();
    })
    .catch((error) => console.log("error:" + error));
}

function addContact(name, email, phone) {
  const id = shortid();
  const newContact = {
    id,
    name,
    email,
    phone,
  };

  fsPromises
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const contacts = JSON.parse(data);
      const updatedContacts = JSON.stringify([...contacts, newContact]);

      fsPromises.writeFile(contactsPath, updatedContacts);
      listContacts();
    })
    .catch((error) => console.log("error:" + error));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
