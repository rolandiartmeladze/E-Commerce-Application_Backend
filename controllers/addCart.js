const mongoose = require('mongoose');
const ObjectId = require("mongoose").Types.ObjectId;

const cart = async (req, res, next) => {

    try {
        const Users = mongoose.connection.db.collection("users");
        const Products = mongoose.connection.db.collection("products");

        const userID = req.params.id;
        const productID = req.body.itemId;
        
        const user = await Users.findOne({ _id: new ObjectId(userID) });
        
        if (user.incart) { 
        const index = user.incart.indexOf(productID);
        if (index === -1) { 
        await Users.updateOne(
        { _id: new ObjectId(userID) }, 
        { $push: { incart: productID } }
        ); 
        } else { 
        await Users.updateOne(
        { _id: new ObjectId(userID) }, 
        { $pull: { incart: productID } }
        ); 
        }
        } else { 
        await Users.updateOne(
        { _id: new ObjectId(userID) }, 
        { $set: { incart: [productID] } }
        ); 
        }
        const updateduser = await Users.findOne({_id : new ObjectId(userID)});
        const updatedincart = updateduser.incart;
        
        res.json(updatedincart);
        console.log('working')
        next();
    } catch (error) {
        next(error);
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
module.exports = { cart };
