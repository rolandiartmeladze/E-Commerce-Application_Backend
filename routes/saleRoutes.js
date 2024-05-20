const express = require('express');
const router = express.Router();
const { updateSale } = require('../controllers/saleController');
        
    router.post('/sale/:id', updateSale);

module.exports = router;
