
const mongoose = require('mongoose');
const ObjectId = require("mongoose").Types.ObjectId;

const saleJurnal = async (req, res, next) => {
  try {
        const Users = mongoose.connection.db.collection("users");
        const Products = mongoose.connection.db.collection("products");


    const query = req.query.sort;
    const userId = new ObjectId(req.params.id);
    const user = await Users.findOne({ _id: userId });
    const time = new Date();

    if( query === "All"){
      if (user && Array.isArray(user.SalesJournal)) { 
          user.SalesJournal.sort((a, b) => new Date(b.time) - new Date(a.time)); 
        }
       res.json(user.SalesJournal); 
     } 

        if( query === "day"){
          time.setHours(0, 0, 0, 0);
            const todaySales = user.SalesJournal.filter(entry => {
              const entryDate = new Date(entry.time);
              return entryDate >= time;
            });
          res.json(todaySales);

         }

      if( query === "week"){
            time.setDate(time.getDate() - 7);
            time.setHours(0, 0, 0, 0); 

        const weekSale = user.SalesJournal.filter(entry => {
            const entryDate = new Date(entry.time);
            return entryDate >= time;
        });

        res.json(weekSale);
      }

    if( query === "month"){
          time.setMonth(time.getMonth() - 1);
          time.setHours(0, 0, 0, 0);
        const monthSale = user.SalesJournal.filter(entry => {
          const entryDate = new Date(entry.time);
          return entryDate >= time;
        });
      res.json(monthSale);            
    }
  }  
    catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  module.exports = { saleJurnal };
