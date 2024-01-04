const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  },
  user: {
    type: String,
    ref: 'User'
  },
  username:{
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true
  },
  addressFormData: {
    address: {
      type: String
    },
    phonenumber: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    country: {
      type: String
    },
    zipCode: {
      type: String
    },
    isDefault: {
      type: Boolean,
      default: false
    }
  },
  orderitems: [{
    imageUrl: {
      type: [String]
    },
    taxable: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    size: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Size'
    },
    sku: {
      type: String
    },
    name: {
      type: String
    },
    description: {
      type: String
    },
    quantity: {
      type: Number
    },
    price: {
      type: Number
    },
    imageKey: {
      type: String
    },
    created: {
      type: Date,
      default: Date.now
    },
    slug: {
      type: String
    },
    inventory: {
      type: Number
    },
    totalPrice: {
      type: Number
    }
  }],

  paymentMethod:{
    type: String

  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
