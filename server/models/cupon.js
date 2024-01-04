const Mongoose = require('mongoose');
const { Schema } = Mongoose;

// Address Schema
const CouponSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true,
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  }
}, { timestamps: true });



module.exports = Mongoose.model('Coupon', CouponSchema);
