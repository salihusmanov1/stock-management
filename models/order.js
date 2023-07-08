const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  warehouse: {
    type: Schema.Types.ObjectId,
    ref: 'Warehouse',
    required: false
  },
  date: {
    type: Date,
    required: true
  },
  expectedDeliveryDate: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  amount: {
    type: Number,
    required: false
  },
  paymentType: {
    type: String,
    required: false
  },
  paymentStatus: {
    type: String,
    required: false
  },
  discount: {
    type: Number,
    required: false
  },
  tax: {
    type: Number,
    required: false
  },
  delivery: {
    type: Number,
    required: false
  },
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  user: {
    name: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  customer: {
    name: {
      type: String,
      required: true
    },
    customerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Customer'
    }
  }
});

module.exports = mongoose.model('Order', orderSchema);
