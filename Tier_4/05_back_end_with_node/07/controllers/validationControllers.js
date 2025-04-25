import * as moviesValidations from "../constants/movies.js";
import * as contactsValidations from "../constants/contacts.js";
import * as authValidations from "../constants/auth.js";

export const getMoviesValidations = (req, res) => {
  res.json(moviesValidations);
};

export const getContactsValidations = (req, res) => {
  res.json(contactsValidations);
};

export const getAuthValidations = (req, res) => {
  res.json(authValidations);
};
