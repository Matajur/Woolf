import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { nanoid } from "nanoid";

const contactsPath = resolve("db", "contacts.json");

async function updateContacts(contacts) {
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

export async function listContacts() {
  const data = await readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

export async function addContact({ name, email, phone }) {
  if (name == null) return null;
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email || null,
    phone: phone || null,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

export async function updateContactById(contactId, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  contacts[index] = { ...contacts[index], ...data };
  await updateContacts(contacts);
  return contacts[index];
}
