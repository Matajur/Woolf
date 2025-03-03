import Joi from "joi";

import { typeList, releaseYearRegexp } from "../constants/movies.js";

export const createMovieSchema = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
  favorite: Joi.boolean(),
  type: Joi.string()
    .valid(...typeList)
    .required(),
  releaseYear: Joi.string().pattern(releaseYearRegexp).required(),
});

export const updateMovieSchema = Joi.object({
  title: Joi.string(),
  director: Joi.string(),
  favorite: Joi.boolean(),
  type: Joi.string().valid(...typeList),
  releaseYear: Joi.string().pattern(releaseYearRegexp),
})
  .or("title", "director", "favorite", "type", "releaseYear")
  .messages({
    "object.missing": "Body must have at least one field",
  });
