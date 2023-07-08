const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const currencySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Currency', currencySchema);