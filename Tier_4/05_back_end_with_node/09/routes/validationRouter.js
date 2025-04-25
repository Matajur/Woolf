import { Router } from "express";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import {
  getMoviesValidations,
  getContactsValidations,
  getAuthValidations,
} from "../controllers/validationControllers.js";

const validationRouter = Router();

validationRouter.get("/movies", ctrlWrapper(getMoviesValidations));

validationRouter.get("/contacts", ctrlWrapper(getContactsValidations));

validationRouter.get("/auth", ctrlWrapper(getAuthValidations));

export default validationRouter;
