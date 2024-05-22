const mongoose = require('mongoose');
const ObjectId = require("mongoose").Types.ObjectId;

const sorted = async (req, res, next) => {
    try {
        const Products = mongoose.connection.db.collection("products");
        const { category, view, time } = req.query;

        let query = {};
        if (category) {
            query.category = category;
        }

        let sortOptions = {};
        if (view) {
            if (view === "Most View") {
                sortOptions.view = -1;
            } else if (view === "Less View") {
                sortOptions.view = 1;
            }
        }

        if (time) {
            if (time === "Newest") {
                sortOptions.datatime = -1;
            } else if (time === "Oldest") {
                sortOptions.datatime = 1;
            }
        }

        // Fetch and sort products based on query and sort options
        let products = await Products.find(query).sort(sortOptions).toArray();

        if (products.length === 0) {
            return res.status(404).json({ error: 'No products' });
        }

        res.json(products);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        next();
    }
};


    module.exports = { sorted };
