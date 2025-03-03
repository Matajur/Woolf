import express from "express";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";

import {
  getAllMovies,
  getOneMovie,
  deleteMovie,
  createMovie,
  updateMovie,
  updateStatusMovie,
} from "../controllers/moviesControllers.js";

import {
  createMovieSchema,
  updateMovieSchema,
} from "../schemas/moviesSchemas.js";

const movieRouter = express.Router();

movieRouter.get("/", ctrlWrapper(getAllMovies));

movieRouter.get("/:id", ctrlWrapper(getOneMovie));

movieRouter.delete("/:id", ctrlWrapper(deleteMovie));

movieRouter.post(
  "/",
  isEmptyBody,
  validateBody(createMovieSchema),
  ctrlWrapper(createMovie)
);

movieRouter.put(
  "/:id",
  isEmptyBody,
  validateBody(updateMovieSchema),
  ctrlWrapper(updateMovie)
);

movieRouter.patch(
  "/:id/favorite",
  isEmptyBody,
  validateBody(updateMovieSchema),
  ctrlWrapper(updateStatusMovie)
);

export default movieRouter;
