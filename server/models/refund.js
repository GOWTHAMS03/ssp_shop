const Mongoose = require('mongoose');
const { REFUND_STATUS } = require('../constants');
const { Schema } = Mongoose;

const RefundSchema = new Schema({
  payment_id: {
    type: Schema.Types.ObjectId,
    ref: 'Payment Id',
    default: null
  },
  refund_id: {

    type: Schema.Types.ObjectId,
  },
  amount: {
    type: String,

  },
  currency: {
    type: String,

  },
  status: {
    type: String,
    default: REFUND_STATUS.Waiting_Processing,
    enum: [
      REFUND_STATUS.Waiting_Processing,
      REFUND_STATUS.Success,
      
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model('RefundSchema', RefundSchema);
