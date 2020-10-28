import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'users',
    required: 'El usuario que compra o solicita es obligatorio'
  },
  shop: {
    type: Schema.ObjectId,
    ref: 'shops',
    required: 'El establecimiento o negocio involucrado es obligatorio'
  },
  total: {
    type: Number,
    min: 0,
    required: 'El total de la compra es obligatorio'
  },
  receiverName: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 80,
    required: 'El nombre de la persona que recibe es obligatorio'
  },
  address: {
    state: {
      type: String,
      trim: true,
      maxlength: 80
    },
    city: {
      type: String,
      trim: true,
      maxlength: 80
    },
    zipCode: {
      type: String,
      maxlength: 10,
      trim: true
    },
    description: {
      type: String,
      trim: true,
      minlength: 40,
      maxlength: 200,
    }
  },
  receiverPhone: {
    type: String,
    trim: true,
    minlength: 10, 
    maxlength: 20
  },
  state: { // COMPLETED, PENDING, CANCELED
    type: String,
    trim: true,
    default: 'PENDING'
  },
  completedDate: {
    type: Date
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  details: [
    {
      amount: { type: Number, min: 1, required: true },
      subtotal: { type: Number, min: 0, required: true },
      article: { type: Schema.ObjectId, ref: 'articles', required: true }
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

const Order = mongoose.model('orders', orderSchema);
export default Order;