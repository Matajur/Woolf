import Joi from "joi";

import { phoneRegexp } from "../constants/contacts.js";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "string.pattern.base": "Phone number must be in the format (XXX) XXX-XXXX",
  }),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  phone: Joi.string().pattern(phoneRegexp).messages({
    "string.pattern.base": "Phone number must be in the format (XXX) XXX-XXXX",
  }),
  favorite: Joi.boolean(),
})
  .or("name", "email", "phone", "favorite")
  .messages({
    "object.missing": "Body must have at least one field",
  });
