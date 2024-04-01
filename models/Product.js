const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    phone: { type: String, required: true },
    address:  { type: String, required: true },
    owner: { type: String, required: true },
    sale: { type: Number, required: true }, 
    location: { type: String, required: true },
    view: { type: Number, required: true }, 
    image: { type: Array, required: true }
});

module.exports = mongoose.model("Product", productSchema, 'products');
