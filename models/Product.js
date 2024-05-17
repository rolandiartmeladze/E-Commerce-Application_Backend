const mongoose = require("mongoose");

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
    comment:  { type: String, required: true },
    description:  { type: String, required: true },
    category: { type: String, required: true },
    datatime: { type: String, required: true },
    image: { type: [{ url: String }], required: true, default: [] },
    userID: { type: String, required: true },



});

// Indexes can be added here if needed

module.exports = mongoose.model("Product", productSchema, 'products');
