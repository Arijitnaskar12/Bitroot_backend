const mongoose = require('mongoose');

const PhoneNumberSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    unique: true
  }
});

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumbers: [PhoneNumberSchema],
  image: {
    type: String, // URL path to the uploaded image
    required: false
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
