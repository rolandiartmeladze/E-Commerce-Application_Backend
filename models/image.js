const mongoose = require('mongoose'); 
const ImageSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  }
});

const image = mongoose.model('Image', ImageSchema); 

module.exports = image; 
