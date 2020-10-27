import Joi from "@hapi/joi";

exports.store = Joi.object({
  name: Joi.string()
    .trim()
    .min(4)
    .max(70)
    .required(),
  description: Joi.string()
    .trim()
    .max(100)
    .empty('')
});

exports.update = Joi.object({
  _id: Joi.string()
    .alphanum()
    .min(10)
    .required(),
  name: Joi.string()
    .trim()
    .min(4)
    .max(70)
    .required(),
  description: Joi.string()
    .trim()
    .max(100)
    .empty('')
});