import Contact from "../db/models/Contact.js";

export const listContacts = (query, limit, offset) =>
  Contact.findAll({
    where: query,
    limit: Number(limit),
    offset: Number(offset),
  });

// export const getContactById = (id) => Contact.findByPk(id);

export const getContact = (query) =>
  Contact.findOne({
    where: query,
  });

export const removeContact = async (query) => {
  const contact = await getContact(query);
  if (!contact) return null;
  await contact.destroy();

  return contact;
};

export const addContact = (data) => Contact.create(data);

export const updateContact = async (query, data) => {
  const contact = await getContact(query);
  if (!contact) return null;

  return contact.update(data, { returning: true });
};
