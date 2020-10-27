import mongoose, { Schema } from "mongoose";
import slug from "slug";

const shopCategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: 'El nombre de la categoría es obligatorio'
  },
  url: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

shopCategorySchema.pre('save', function() {
  this.url = slug(this.name);
  next();
});

module.exports = mongoose.model('shopCategories', shopCategorySchema);