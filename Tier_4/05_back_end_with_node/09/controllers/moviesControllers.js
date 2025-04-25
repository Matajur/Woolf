import fs from "node:fs/promises";
import path from "node:path";

import * as moviesServices from "../services/moviesServices.js";

import HttpError from "../helpers/HttpError.js";

import cloudinary from "../helpers/cloudinary.js";

export const getAllMovies = async (req, res) => {
  const { id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;

  const offset = (page - 1) * limit;
  const query = { owner };

  if (favorite !== undefined) {
    query.favorite = favorite === "true";
  }

  const result = await moviesServices.getMovies(query, limit, offset);

  res.json(result);
};

export const getOneMovie = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await moviesServices.getMovie({ id, owner });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await moviesServices.removeMovie({ id, owner });
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export const createMovie = async (req, res) => {
  let posterURL = null;
  if (req.file) {
    const { url } = await cloudinary.uploader.upload(req.file.path, {
      folder: "posters",
      use_filename: true,
    });
    posterURL = url;
    await fs.unlink(req.file.path);
  }

  const { id: owner } = req.user;
  const result = await moviesServices.addMovie({
    ...req.body,
    posterURL,
    owner,
  });

  res.status(201).json(result);
};

export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await moviesServices.updateMovie({ id, owner }, req.body);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

export const updateStatusMovie = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsServices.updateMovie({ id, owner }, req.body);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};
