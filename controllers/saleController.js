const mongoose = require('mongoose');
const ObjectId = require("mongoose").Types.ObjectId;

const updateSale = async (req, res) => {
  try {
        const Users = mongoose.connection.db.collection("users");
        const Products = mongoose.connection.db.collection("products");

    const {name,price,amount,time,currency,unit,product} = req.body;
    const saleInfo = {name,price,amount,currency,unit,time,};
      const user = req.params.id;
        const userId = new ObjectId(user);

            const userDoc = await Users.findOne(
                { _id: userId }, 
                { projection: { SalesJournal: 1 } }
             );
          
      if (userDoc && userDoc.SalesJournal) {
        await Users.updateOne(
          { _id: userId },
          { $push: { SalesJournal: saleInfo } }
         );
      } else {
          await Users.updateOne(
            { _id: userId },
            { $set: { SalesJournal: [saleInfo] } }
           );
          }

          const products = await Products.updateOne(
            {_id: new ObjectId(product)},
            { $inc: { sale: amount, quantity: -amount } },
            );

    res.status(200).json({message: 'It was successfully sold', name, amount});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { updateSale };
