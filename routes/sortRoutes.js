const express = require('express');
const router = express.Router();
const { sorted } = require('../controllers/sortProducts');
        
    router.get('/sortedcategory', sorted);

module.exports = router;
