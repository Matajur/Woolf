import * as contactsServices from "../services/contactsServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  const offset = (page - 1) * limit;
  const query = { owner };

  if (favorite !== undefined) {
    query.favorite = favorite === "true";
  }

  const result = await contactsServices.listContacts(query, limit, offset);

  res.json(result);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsServices.getContact({ id, owner });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsServices.removeContact({ id, owner });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const result = await contactsServices.addContact({ ...req.body, owner });

  res.status(201).json(result);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsServices.updateContact({ id, owner }, req.body);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsServices.updateContact({ id, owner }, req.body);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};
