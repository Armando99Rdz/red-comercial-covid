import mongoose, { Schema } from "mongoose";
import slug from "slug";
import shortid from "shortid";

const articleSchema = new Schema({
  shop: {
    type: Schema.ObjectId,
    ref: 'shops',
    required: 'El negocio o empresa que oferta es obligatorio'
  },
  category: {
    type: Schema.ObjectId,
    required: 'La categoría es obligatoria'
  },
  title: {
    type: String, 
    minlength: 6,
    maxlength: 80,
    required: 'El titulo del servicio o producto es obligatorio'
  },
  description: {
    type: String,
    minlength: 25,
    maxlength: 255
  },
  images: [
    {
      path: { type: String, required: true }
    }
  ],
  price: {
    type: Number,
    min: 0,
    required: 'El precio base del producto o servicio es obligatorio'
  },
  priceOld: {
    type: Number,
    min: 0
  },
  stock: {
    type: Number,
    min: 0,
  },
  isService: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  url: {
    type: String
  },

}, { timestamps: true });

articleSchema.pre('save', function(next) {
  const url = slug(this.title);
  this.url = `${url}-${shortid.generate()}`;
  next();
});

const Article = mongoose.model('articles', articleSchema);
export default Article;