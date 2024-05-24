const express = require('express');
const router = express.Router();
const { saleJurnal } = require('../controllers/saleJurnal');
        
    router.get('/salejurnal/:id', saleJurnal);

module.exports = router;
