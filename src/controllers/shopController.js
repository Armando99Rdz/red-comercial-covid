import Shop from "../models/Shop";

exports.index = async (req, res, next) => {
  try {
    const shops = await Shop.find({});
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.store = async (req, res, next) => {
  try {
    const shop = await Shop.create(req.body);
    await shop.save();
    res.status(200).json(shop);
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
} 


exports.show = async (req, res, next) =>  {
  try {
    const shop = await Shop.findOne({ _id: req.query._id });
    if (!shop)
      res.status(404).send({
        errors: ['Este establecimiento no existe']
      });
    else 
      res.status(200).json(shop);
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}


exports.updateBaseInfo = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({ _id: req.body._id });
    if (!shop)
      res.status(404).send({
        errors: ['Este establecimiento no existe']
      });
    else {
      shop.name = req.body.name;
      shop.category = req.body.category;
      shop.description = req.body.description;
      shop.logoPath = req.body.logoPath;
      shop.phoneNumber = req.body.phoneNumber;
      shop.email = req.body.email;
      shop.openingTime = req.body.openingTime;
      shop.closingTime = req.body.closingTime;
      await shop.save();
      res.status(200).json(shop);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.updateAddress = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({ _id: req.body._id });
    if (!shop)
      res.status(404).send({
        errors: ['Este establecimiento no existe']
      });
    else {
      shop.state = req.body.state;
      shop.city = req.body.city;
      shop.address = req.body.address;
      shop.lat = req.body.lat;
      shop.lng = req.body.lng;
      await shop.save();
      res.status(200).json(shop);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.updateCategories = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({ _id: req.body._id });
    if (!shop)
      res.status(404).send({
        errors: ['Este establecimiento no existe']
      });
    else {
      if (req.body.categories){
        shop.categories = req.body.categories;
        await shop.save();
        res.status(200).json(shop);
      } else
        res.status(400).send({
          errors: ['Se esperaba una lista de categorías']
        });
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.updateImages = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({ _id: req.body._id });
    if (!shop)
      res.status(404).send({
        errors: ['Este establecimiento no existe']
      });
    else {
      shop.images = req.body.images;
      await shop.save();
      res.status(200).json(shop);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.changeState = async (req, res, next) => {
  try {
    const shop = await Shop.findOne({ _id: req.body._id });
    if (!shop)
      res.status(404).send({
        errors: ['Este establecimiento no existe']
      });
    else {
      shop.isActive = shop.isActive ? false : true;
      await shop.save();
      res.status(200).json(shop);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}


exports.delete = async (req, res, next) => {
  try {
    const shop = await Shop.findByIdAndRemove({ _id: req.body._id });
    res.status(200).json(shop);
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}