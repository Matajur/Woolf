import { Router } from "express";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import {
  getMoviesValidations,
  getContactsValidations,
} from "../controllers/validationControllers.js";

const validationRouter = Router();

validationRouter.get("/movies", ctrlWrapper(getMoviesValidations));

validationRouter.get("/contacts", ctrlWrapper(getContactsValidations));

export default validationRouter;
