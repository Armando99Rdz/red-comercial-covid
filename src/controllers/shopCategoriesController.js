import ShopCategory from "../models/ShopCategory";
import Shop from "../models/Shop";

exports.index = async (req, res, next) => {
  try {
    const q = req.query.q;
    const categories = await ShopCategory.find(
      {
        $or: [
          { 'name': new RegExp(q, 'i') },
          { 'url': new RegExp(q, 'i') },
          { 'description': new RegExp(q, 'i') }
        ]
      }
    ).sort({ 'createdAt': -1 }); // orden descendente.
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.store = async (req, res, next) => {
  try {
    const category = await ShopCategory.create(req.body);
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.show = async (req, res, next) => {
  try {
    const category = await ShopCategory.findOne({ _id: req.query._id });
    if (!category)
      res.status(404).send({
        errors: ['La categoría no existe']
      })
    else 
      res.status(200).json(category);
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.update = async (req, res, next) => {
  try {
    const category = await ShopCategory.findOne({ _id: req.body._id });
    if (!category)
      res.status(404).send({
        errors: [error]
      });
    else {
      category.name = req.body.name;
      category.description = req.body.description;
      await category.save();
      res.status(200).json(category);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

/**
 * Change isActive: 
 * - if !isActive then = true
 * - if isActive then = false
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.changeState = async (req, res, next) => {
  try {
    const category = await ShopCategory.findOne({ _id: req.body._id });
    if (!category)
      res.status(404).send({
        errors: ['Esta categoría no existe']
      });
    else {
      category.isActive = category.isActive ? false : true;
      await category.save();
      res.status(200).json(category);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}


exports.delete = async (req, res, next) => {

  const shop = await Shop.findOne({ category: req.body._id });
  if (shop) // si tiene establecimientos esta categoría.
    res.status(500).send({
      errors: ['Imposible eliminar al tener establecimientos.']
    });
  else 
    try {
      const category = await ShopCategory.findByIdAndRemove({ _id: req.body._id });
      res.status(200).json(category);
    } catch (error) {
      res.status(500).send({
        errors: [error]
      });
    }
}