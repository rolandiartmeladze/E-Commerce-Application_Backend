const mongoose = require('mongoose');
const ObjectId = require("mongoose").Types.ObjectId;

const producti = async (req, res, next) => {

    try {
        const Users = mongoose.connection.db.collection("users");
        const Products = mongoose.connection.db.collection("products");

        const userID = new ObjectId(req.params.id);

const user = await Users.findOne({ _id: userID });
const products = user.products;

const productIds = products.map(productId => new ObjectId(productId));
const MainProduct = await Products.find({ _id: { $in: productIds } }).toArray();

res.status(200).json(MainProduct);

        // next();
    } catch (error) {
        // next(error);
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = { producti };
