const Product = require('../models/Product');
const mongoose = require("mongoose");

async function createNewProduct(productData) {
    try {
        const {
            name, email, phone, address, img, price, quantity, quantityiunit,
            location, owner, sale, view, currency, comment, description, 
            category, datatime, share, id, userID
        } = productData;

        const newProduct = new Product({
            name, email, phone, address, image: img,
            price, quantity, quantityUnit: quantityiunit,
            location, owner, sale, view, currency, 
            comment, description, category, 
            datatime, share, id, userID
        });

        await newProduct.save();

        return newProduct._id;
    } catch (error) {
        throw error;
    }
}

module.exports = createNewProduct;