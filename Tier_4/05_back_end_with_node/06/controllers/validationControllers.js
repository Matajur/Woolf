import * as moviesValidations from "../constants/movies.js";
import * as contactsValidations from "../constants/contacts.js";

export const getMoviesValidations = (req, res) => {
  res.json(moviesValidations);
};

export const getContactsValidations = (req, res) => {
  res.json(contactsValidations);
};
