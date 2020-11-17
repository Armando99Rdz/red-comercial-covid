import User from '../models/User';
import token from '../helpers/jwt';

exports.login = async (req, res, next) =>{
  const errors = [];
  if (!req.body.email)
    errors.push({ text: 'Ingrese un email válido'});
  if (!req.body.password)
    errors.push({ text: 'Ingrese una contraseña válida'});

  if (errors.length > 0){
    res.status(500).send({
      errors
    });
  }else {
    const { email } = req.body;
    try {
      // busca por el email recibido y sólo usuarios activos (isActive = true).
      const user = await User.findOne({ email: email, isActive: true });
      console.log(user);
      if (!user){
        errors.push({ text: 'El usuario no existe'});
        res.status(404).send({
          errors
        });
        next();
      }else{
        const match = await user.matchPassword(req.body.password);
        if (match){
          // crear JWT
          let tokenGenerated = await token.encode(user._id);
          res.status(200).json({user, token: tokenGenerated});
        }else{
          errors.push({text: 'La contraseña es incorrecta'});
          res.status(404).send({
            errors
          });
          next();
        }
      }

    } catch (e) {
      errors.push({ text: 'Ocurrió un al validar las credenciales' });
      res.status(500).send({
        errors
      });
      next(e);
    }
  }

}

/**
 * Show all users
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.index = async (req, res, next) => {
  try {
    const q = req.query.q; // string de búsqueda (opcional).
    const users = await User.find(
      {
        $or: [
          { 'firstname': new RegExp(q, 'i') },
          { 'lastname': new RegExp(q, 'i') },
          { 'email': new RegExp(q, 'i') },
        ]
      },
      //{ updatedAt: 0 } no mostrar 0, mostrar 1.
    ).sort({ 'createdAt': -1 }); // orden descendente (-1)
    if (!users) {
      res.status(404).send({
        errors: ['No se pudieron obtener los registros']
      });
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}


/**
 * Save a new user
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.store = async (req, res, next) => {

  try {
    const user = await User.create(req.body);
    user.password = await user.encryptPassword(req.body.password);
    user.save();
    if (!user) {first
      res.status(404).send({
        errors: ['No se pudo guardar el registro']
      });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}


exports.show = async (req, res, next) => {

  if (!req.query._id) next();
  try {
    const user = await User.findOne({ _id: req.query._id });
    if (!user){
      res.status(404).send({
        errors: ['No se pudo encontrar este usuario']
      });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.update = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.body._id });
    if (!user) {
      res.status(404).send({
        errors: ['No se encontró el usuario']
      });
    } else {

      if (req.body.password != user.password)
        user.password = await user.encryptPassword(req.body.password);
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.imagePath = req.body.imagePath
      await user.save();
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    })
  }
}


exports.delete = async (req, res, next) => {
  try {
    const user = await User.findByIdAndRemove({ _id: req.body._id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.updateAddresses = async (req, res, next) => {
  
  try {
    if (!req.body.addresses){
      res.status(400).send({
        errors: ['Se esperaba una lista de direcciones']
      });
    } else {
      const user = await User.findById({ _id: req.body._id });
      if (!user)
        res.status(404).send({
          errors: ['Este usuario no existe']
        });
      user.addresses = req.body.addresses;
      user.save();
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}