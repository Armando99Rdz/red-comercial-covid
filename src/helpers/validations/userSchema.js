import Joi from '@hapi/joi';

module.exports = {

  /**
   * Schema para validar un User.
   */
  store: Joi.object({
    firstname: Joi.string()
      .min(2)
      .max(70)
      .required(),
    lastname: Joi.string()
      .min(2)
      .max(70)
      .required(),    
    type: Joi.number()
      .min(1)
      .max(3)
      .required(),    
    email: Joi.string()
      .trim()
      .email()
      .max(255)
      .required(),
    password: Joi.string()
      .trim()
      .min(3)
      .max(255)
      .required(),
    imagePath: Joi.string()
      .trim()
      .empty('')
  }),

  /**
   * Schema para validar una actualización de User.
   */
  update: Joi.object({
    _id: Joi.string()
      .trim()
      .alphanum()
      .min(10)
      .required(),
    firstname: Joi.string()
      .min(2)
      .max(70)
      .required(),
    lastname: Joi.string()
      .min(2)
      .max(70)
      .required(),    
    type: Joi.number()
      .min(1)
      .max(3)
      .required(),    
    email: Joi.string()
      .trim()
      .email()
      .max(255)
      .required(),
    password: Joi.string()
      .trim()
      .min(3)
      .max(255)
      .required(),
    imagePath: Joi.string()
      .trim()
      .empty(''),
    addresses: Joi.array()
      .unique('description')
  })

}