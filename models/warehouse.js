const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const warehouseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
   zipcode: {
    type: Number,
    required: false
  },
   phone: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
