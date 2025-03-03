import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be in the format (XXX) XXX-XXXX",
    }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "string.pattern.base":
        "Phone number must be in the format (XXX) XXX-XXXX",
    }),
})
  .or("name", "email", "phone")
  .messages({
    "object.missing": "Body must have at least one field",
  });
