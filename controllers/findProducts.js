const mongoose = require('mongoose');
const ObjectId = require("mongoose").Types.ObjectId;

const find = async (req, res, next) => {

    try {
        const Products = mongoose.connection.db.collection("products");
        const findInput = req.query.Find; 
        if (!findInput) {return res.status(400).json({ error: 'Enter a search term' });}
        const products = await Products
        .find({ "name": { $regex: findInput, $options: 'i' } }) 
        .toArray();
        res.status(200).json(products);
        next();
        } catch (error) {
        next(error);
        console.error('Error filtering products:', error);
        res.status(500).json({ error: 'Internal server error' });
        }
           
     
}
module.exports = { find };
