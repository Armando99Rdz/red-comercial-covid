import mongoose, { Schema } from "mongoose";
import slug from "slug";

const shopSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'users',
    required: 'El usuario a cargo es obligatorio'
  },
  category: {
    type: Schema.ObjectId,
    ref: 'shopCategories',
    required: 'La categoría del negocio es obligatoria'
  },
  name: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 80,
    unique: true,
    required: 'El nombre del local o negocio es obligatorio'
  },
  state: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 80,
    required: 'El estado o provincia es obligatorio'
  },
  city: {
    type: String,
    trim: true,
    minlength: 2,
    maxlength: 80,
    required: 'La ciudad es obligatoria es obligatoria'
  },
  address: {
    type: String,
    trim: true,
    minlength: 25,
    maxlength: 150
  },
  url: {
    type: String,
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  logoPath: {
    type: String
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String, 
    minlength: 10,
    maxlength: 17,
    required: true
  },
  email: {
    type: String,
    trim: true,
    maxlength: 255,
    required: 'El correo electrónico es obligatorio'
  },
  description: {
    type: String,
    trim: true,
    minlength: 20,
    maxlength: 150,
  },
  openingTime: { // hora
    type: String,
    trim: true,
    maxlength: 10
  },
  closingTime: {
    type: String,
    trim: true,
    maxlength: 10
  },

}, { timestamps: true });

shopSchema.pre('save', function() {
  this.url = slug(this.name);
  next();
});

module.exports = mongoose.model('shops', shopSchema);