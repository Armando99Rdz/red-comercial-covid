import tokenHelper from "../helpers/jwt";

export default {
  verifyUser: async (req, res, next) => {
    const { token } = req.headers;
    const errors = [];
    if (!token) { // not token 
      errors.push({ text: 'No token' });
      return res.status(403).send({
        errors: errors
      });
    } else {
      const user = await tokenHelper.decode(token);
      if (user.type == 1 || user.type == 2 || user.type == 3) {
        next();
      } else {
        errors.push({ text: 'No estas autorizado para continuar' });
        return res.status(403).send({ errors: errors });
      }
    }
  },
  verifyAdmin: async (req, res, next) => {
    const { token } = req.headers;
    const errors = [];
    if (!token) { // not token 
      errors.push({ text: 'No token' });
      return res.status(403).send({
        errors: errors
      });
    } else {
      const user = await tokenHelper.decode(token);
      if (user.type == 1) {// is admin
        next();
      } else {
        errors.push({ text: 'No estas autorizado para continuar' });
        return res.status(403).send({ errors: errors });
      }
    }
  },
  verifyComerciante: async (req, res, next) => {
    const { token } = req.headers;
    const errors = [];
    if (!token) { // not token 
      errors.push({ text: 'No token' });
      return res.status(403).send({
        errors: errors
      });
    } else {
      const user = await tokenHelper.decode(token);
      if (user.type == 2 || user.type == 1) {// es comerciante o admin
        next();
      } else {
        errors.push({ text: 'No estas autorizado para continuar' });
        return res.status(403).send({ errors: errors });
      }
    }
  },
  verifyClient: async (req, res, next) => {
    const { token } = req.headers;
    const errors = [];
    if (!token) { // not token 
      errors.push({ text: 'No token' });
      return res.status(403).send({
        errors: errors
      });
    } else {
      const user = await tokenHelper.decode(token);
      if (user.type == 3 || user.type == 1) { // cliente o comerciante
        next();
      } else {
        errors.push({ text: 'No estas autorizado para continuar' });
        return res.status(403).send({ errors: errors });
      }
    }
  }
}