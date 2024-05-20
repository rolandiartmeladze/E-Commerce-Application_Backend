const mongoose = require('mongoose');
const ObjectId = require("mongoose").Types.ObjectId;

const sorted = async (req, res, next) => {

    try {
        
        const Products = mongoose.connection.db.collection("products");

        const time = req.query.time;
const {category, view} = req.query;

let products = await Products.find().toArray();

const sortedCategory = async () =>{
return products = await Products.find({ "category": category }).toArray();
}

const sortedview = async () =>{
let result = null;
if(view === "Most View"){
result = products.sort((a, b) => b.view - a.view);
}
else if(view === "Less View"){
result = products.sort((a, b) =>  a.view - b.view);
}
return products = result;
}

const sorted = async () => {
if(category || view ||  time){
category && await sortedCategory();
view && await sortedview();
}
return await products;

}

const sortedProducts = await sorted();

if (products.length === 0) { return res.status(404).json({ error: 'No products' });}
res.json(sortedProducts);


    next();
    } catch (error) {
        next(error);
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    
    }

}
    module.exports = { sorted };
