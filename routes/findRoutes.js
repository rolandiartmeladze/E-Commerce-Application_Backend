const express = require('express');
const router = express.Router();
const { find } = require('../controllers/findProducts');
        
    router.get('/Find', find);

module.exports = router;
