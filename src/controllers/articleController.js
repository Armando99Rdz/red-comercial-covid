import Article from "../models/Article";

exports.index = async (req, res, next) => {
  try {
    const articles = await Article.find({});
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.store = async (req, res, next) => {
  try {
    const article = await Article.create(req.body);
    await article.save();
    res.status(200).json(article);
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.show = async (req, res, next) => {
  try {
    const article = await Article.findOne({ _id: req.query._id});
    if (!article)
      res.status(404).send({
        errors: ['Este artículo no existe']
      });
    else
      res.status(200).json(article);
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}


exports.updateBaseInfo = async (req, res, next) => {
  try {
    const article = await Article.findOne({ _id: req.body._id });
    if (!article)
      res.status(404).send({
        errors: ['Este artículo no existe']
      });
    else {
      article.title = req.body.title;
      article.category = req.body.category;
      article.description = req.body.description;
      article.price = req.body.price;
      article.priceOld = req.body.priceOld;
      article.stock = req.body.stock;
      await article.save();
      res.status(200).json(article);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.updateImages = async (req, res, next) => {
  try {
    const article = await Article.findOne({ _id: req.body._id });
    if (!article)
      res.status(404).send({
        errors: ['Este artículo no existe']
      });
    else {
      article.images = req.body.images;
      await article.save();
      res.status(200).json(article);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.changeState = async (req, res, next) => {
  try {
    const article = await Article.findOne({ _id: req.body._id });
    if (!article)
      res.status(404).send({
        errors: ['Este artículo no existe']
      });
    else {
      article.isActive = article.isActive ? false : true;
      await article.save();
      res.status(200).json(article);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}
