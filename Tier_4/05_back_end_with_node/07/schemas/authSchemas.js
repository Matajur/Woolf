import Joi from "joi";

import { emailRegexp, subscriptionList } from "../constants/auth.js";

export const authRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Enter valid email",
  }),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscriptionList),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Enter valid email",
  }),
  password: Joi.string().required(),
});
