const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  url: {
    type: String, 
    required: true
  },
});

const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  owner: { type: String, required: true },
  sale: { type: Number, required: true, default: 0 },
  location: { type: String, required: true },
  view: { type: Number, required: true, default: 0 },
  share: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  quantity: { type: Number, required: true, default: 0 },
  quantityUnit: { type: String, required: true },
  currency: { type: String, required: true },
  comment: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  datatime: { type: Date, required: true, default: Date.now },
  images: [ImageSchema],  // Updated field name to 'images'
  userID: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Product", productSchema, 'products');
