const express = require('express');
const router = express.Router();
const { producti } = require('../controllers/mainProduct');
        
    router.get('/Main/:id', producti);

module.exports = router;
