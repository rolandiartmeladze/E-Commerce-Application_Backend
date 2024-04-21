const mongoose = require("mongoose");


// ქნის მოდელს დასამატებელი მონაცემების ტიპების განსაზღვრისთვის
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address:  { type: String, required: true },
    products: { type: Array, required: true },
    favorits: { type: Array, required: true }
});

module.exports = mongoose.model("User", userSchema, 'users');
