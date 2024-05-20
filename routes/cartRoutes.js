const express = require('express');
const router = express.Router();
const { cart } = require('../controllers/addCart');
        
    router.post('/addCarItem/:id', cart);

module.exports = router;
