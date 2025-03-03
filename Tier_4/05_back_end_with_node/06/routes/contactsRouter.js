import express from "express";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";

import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlWrapper(getAllContacts));

contactsRouter.get("/:id", ctrlWrapper(getOneContact));

contactsRouter.delete("/:id", ctrlWrapper(deleteContact));

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(createContactSchema),
  ctrlWrapper(createContact)
);

contactsRouter.put(
  "/:id",
  isEmptyBody,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContact)
);

contactsRouter.patch(
  "/:id/favorite",
  isEmptyBody,
  validateBody(updateContactSchema),
  ctrlWrapper(updateStatusContact)
);

export default contactsRouter;
