
/**
 * Data Validation Middlware - Usando los schemas (@hapi/joi).
 * @param JoiSchema schema 
 */
module.exports = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      res.status(400).send({
        errors: [error]
      });
    }
  }
}