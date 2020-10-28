import Joi from "@hapi/joi";

exports.store = Joi.object({
  shop: Joi.string().alphanum().min(15).required(),
  category: Joi.string().alphanum().min(15).required(),
  title: Joi.string().min(6).max(80).required(),
  description: Joi.string().min(25).empty(''),
  price: Joi.number().positive().required(),
  priceOld: Joi.number().positive().empty(''),
  stock: Joi.number().positive().empty(''),  
  isService: Joi.boolean().empty(''),
  images: Joi.array().unique('path').empty('')
});

exports.updateBaseInfo = Joi.object({
  _id: Joi.string().alphanum().min(15).required(),
  category: Joi.string().alphanum().min(15).required(),
  title: Joi.string().min(6).max(80).required(),
  description: Joi.string().min(25).empty(''),
  price: Joi.number().positive().required(),
  priceOld: Joi.number().positive().empty(''),
  stock: Joi.number().positive().empty('')
});


exports.updateImages = Joi.object({
  _id: Joi.string().alphanum().min(15).required(),
  images: Joi.array().unique('path').empty('')
});