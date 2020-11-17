import Article from "../models/Article";
import { } from "dotenv/config";
const stripe = require('stripe')(process.env.STRIPE_PUBLIC_KEY);

exports.createSession = async (req, res) => {
  const { items } = req.body;
  console.log(req.body);
  const amount = calculateOrderAmount(items);
  console.log(amount * 100);
  // create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'mxn'
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
}

// TODO: to prevent people can manipulate the amount on the client.
const calculateOrderAmount = (items) => {
  let amount = 0;
  items.forEach(element => {
    amount += element.article.price * element.quantity;
  });
  return amount;
}