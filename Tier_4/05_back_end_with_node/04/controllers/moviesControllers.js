import * as moviesServices from "../services/moviesServices.js";

import HttpError from "../helpers/HttpError.js";

export const getAllMovies = async (req, res) => {
  const result = await moviesServices.getMovies();

  res.json(result);
};

export const getOneMovie = async (req, res) => {
  const { id } = req.params;
  const result = await moviesServices.getMovieById(id);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  const result = await moviesServices.removeMovie(id);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export const createMovie = async (req, res) => {
  const result = await moviesServices.addMovie(req.body);

  res.status(201).json(result);
};

export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const result = await moviesServices.updateMovieById(id, req.body);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};
