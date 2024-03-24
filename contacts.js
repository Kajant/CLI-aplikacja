const generateUniqueId = require('generate-unique-id')
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join('./db/','contacts.json');

async function listContacts() {
    try {
      const data = await fs.readFile(contactsPath);
      return JSON.parse(data);
    }
    catch (error) {
        console.log('error');
    }
  };

async function getContactById(id) {
    const contacts = await listContacts();
    try {
        const contact = contacts.find(item => item.id === id);
        return contact;
    }
    catch (error) {
        console.log('error');
    }
  };

async function removeContact(id) {
    const contacts = await listContacts();
    try {
        const index = contacts.findIndex(item => item.id === id);
        if (index === -1) {
            console.log('Contact not found');
        }
        const result = contacts.splice(index, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return result;
    }
    catch (error) {
        console.log('error');
    }
  }

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    try {
    const newContact = { 
        id: generateUniqueId(),
        name,
        email,
        phone,
        };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
    }
    catch {
        console.log('error');
    }
  }
  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  };