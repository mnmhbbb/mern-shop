const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
      default: [],
    },
    category: {
      type: Number,
      default: 1,
    },
    sold: {
      type: Number,
      maxlength: 1,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

productSchema.index(
  {
    title: 'text',
    description: 'text',
  },
  {
    weights: {
      title: 5,
      description: 3,
    },
  },
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
