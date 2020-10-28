import Order from "../models/Order";
import Article from "../models/Article";

exports.index = async (req, res, next) => {
  try {
    const q = req.query.q;
    const orders = await Order.find(
      {
        $or: [
          { 'receiverName': new RegExp(q, 'i') },
          { 'receiverPhone': new RegExp(q, 'i') }
        ]
      }
    )
    .sort({ 'createdAt': -1 }) // orden descendente.
    .populate('user', { firstname: 1, lastname: 1, email: 1 })
    .populate('shop', { name: 1, url: 1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.store = async (req, res, next) => {
  if (req.body.details < 1)
    res.status(400).send({
      errors: ['Se esperaba una lista con los detalles']
    });

  try {
    req.body.total = 0;
    await req.body.details.forEach( (detail) => {
      req.body.total += detail.subtotal;
    });
    const order = await Order.create(req.body);
    await order.save();
    res.status(200).json(order);

  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.show = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.query._id })
      .populate('user', { firstname: 1, lastname: 1, email: 1 })
      .populate('shop', { name: 1, url: 1 });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.update = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.body._id });
    if (!order)
      res.status(404).send({
        errors: ['Esta orden o pedido no existe']
      });
    else {
      order.receiverName = req.body.receiverName;
      order.receiverPhone = req.body.receiverPhone;
      order.address = req.body.address;
      await order.save();
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.updateStatus = async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.body._id });
    if (!order)
      res.status(404).send({
        errors: ['Esta orden o pedido no existe']
      });
    else {
      order.isPaid = req.body.isPaid;
      order.status = req.body.status;
      if (order.status === 'COMPLETED')
        order.completedDate = Date.now();
      await order.save();
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}

exports.changeState = async (req, res, next) =>{
  try {
    const order = await Order.findOne({ _id: req.body._id });
    if (!order)
      res.status(404).send({
        errors: ['Esta orden o pedido no existe']
      });
    else {
      order.isActive = order.isActive ? false : true;
      await order.save();
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}


exports.delete = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndRemove({ _id: req.body._id });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).send({
      errors: [error]
    });
  }
}