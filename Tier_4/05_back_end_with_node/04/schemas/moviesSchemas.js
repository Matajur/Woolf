import Joi from "joi";

export const createMovieSchema = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
});

export const updateMovieSchema = Joi.object({
  title: Joi.string(),
  director: Joi.string(),
})
  .or("title", "director")
  .messages({
    "object.missing": "Body must have at least one field",
  });
