
const mongoose = require('mongoose');
const ObjectId = require("mongoose").Types.ObjectId;

const saleJurnal = async (req, res, next) => {
  try {
    const Users = mongoose.connection.db.collection("users");
    const userId = new ObjectId(req.params.id);
    const user = await Users.findOne({ _id: userId });

    if (!user || !Array.isArray(user.SalesJournal)) {
      return res.status(404).json({ message: 'User or SalesJournal not found' });
    }

    user.SalesJournal.sort((a, b) => new Date(b.time) - new Date(a.time));

    const query = req.query.sort;
    const time = new Date();

    if (query === "All") {return res.json(user.SalesJournal);}

    let filteredSales = [];

    if (query === "day") {
      time.setHours(0, 0, 0, 0);
      filteredSales = user.SalesJournal.filter(entry => {
        const entryDate = new Date(entry.time);
        return entryDate >= time;
      });
    } else if (query === "week") {
      time.setDate(time.getDate() - 7);
      time.setHours(0, 0, 0, 0);
      filteredSales = user.SalesJournal.filter(entry => {
        const entryDate = new Date(entry.time);
        return entryDate >= time;
      });
    } else if (query === "month") {
      time.setMonth(time.getMonth() - 1);
      time.setHours(0, 0, 0, 0);
      filteredSales = user.SalesJournal.filter(entry => {
        const entryDate = new Date(entry.time);
        return entryDate >= time;
      });
    } else {
      return res.status(400).json({ message: 'Invalid query parameter' });
    }

    res.json(filteredSales);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

  module.exports = { saleJurnal };
