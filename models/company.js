const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  users: [
    {
      user: { type: Object, required: true },
    }
  ],
  company: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    number: {
      type: String,
      required: true
    },
    logo:{
        type: Image,
        required: false
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
});

module.exports = mongoose.model('Company', companySchema);
