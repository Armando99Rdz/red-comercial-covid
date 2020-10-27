import Joi from "@hapi/joi";

exports.store = Joi.object({
  user: Joi.string()
    .trim()
    .alphanum()
    .min(15)
    .required(),
  category: Joi.string()
    .trim()
    .alphanum()
    .min(15)
    .required(),
  name: Joi.string()
    .trim()
    .min(4)
    .max(100)
    .required(),
  state: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),
  city: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),
  address: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .empty(''),
  url: Joi.string()
    .empty(''),
  logoPath: Joi.string()
    .max(255)
    .empty(''),
  lat: Joi.number(),
  lng: Joi.number(),
  phoneNumber: Joi.string()
    .trim()
    .min(10)
    .max(17)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  description: Joi.string()
    .trim()
    .min(20)
    .max(150)
    .empty(''),
  openingTime: Joi.string()
    .trim()
    .min(4)
    .max(8)
    .empty(''),
  closingTime: Joi.string()
    .trim()
    .min(4)
    .max(8)
    .empty('')
});

exports.updateBaseInfo = Joi.object({
  _id: Joi.string()
    .alphanum()
    .min(15)
    .required(),
  category: Joi.string()
    .trim()
    .alphanum()
    .min(15)
    .required(),
  name: Joi.string()
    .trim()
    .min(4)
    .max(100)
    .required(),
  url: Joi.string()
    .empty(''),
  logoPath: Joi.string()
    .max(255)
    .empty(''),
  phoneNumber: Joi.string()
    .trim()
    .min(10)
    .max(17)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  description: Joi.string()
    .trim()
    .min(20)
    .max(150)
    .empty(''),
  openingTime: Joi.string()
    .trim()
    .min(4)
    .max(8)
    .empty(''),
  closingTime: Joi.string()
    .trim()
    .min(4)
    .max(8)
    .empty('')
});

exports.updateAddress = Joi.object({
  _id: Joi.string()
    .alphanum()
    .min(15)
    .required(),
  state: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),
  city: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),
  address: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .empty(''),
  lat: Joi.number(),
  lng: Joi.number()
});

exports.updateImages = Joi.object({
  _id: Joi.string()
    .alphanum()
    .min(15)
    .required(),
  images: Joi.array()
    .unique('priority')
});

exports.updateCategories = Joi.object({
  _id: Joi.string()
    .alphanum()
    .min(15)
    .required(),
  categories: Joi.array()
    .unique('name')
});