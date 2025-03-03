import express from "express";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";

import {
  getAllMovies,
  getOneMovie,
  deleteMovie,
  createMovie,
  updateMovie,
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
  validateBody(createMovieSchema),
  ctrlWrapper(createMovie)
);

movieRouter.put(
  "/:id",
  validateBody(updateMovieSchema),
  ctrlWrapper(updateMovie)
);

export default movieRouter;
