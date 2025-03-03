import Contact from "../db/models/Contact.js";

export const listContacts = () => Contact.findAll();

export const getContactById = (id) => Contact.findByPk(id);

export const removeContact = async (id) => {
  const contact = await getContactById(id);
  if (!contact) return null;
  await contact.destroy();

  return contact;
};

export const addContact = (data) => Contact.create(data);

export const updateContactById = async (id, data) => {
  const contact = await getContactById(id);
  if (!contact) return null;

  return contact.update(data, { returning: true });
};
