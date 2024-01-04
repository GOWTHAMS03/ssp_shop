const Mongoose = require('mongoose');
const { RETURNORDER_STATUS } = require('../constants');
const { Schema } = Mongoose;

const ReturnRequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  order: {

    type: Schema.Types.ObjectId,
  },
  imageUrl: {
    type: [String]
  },
  paymentmethod: {
    type: String,

  },
  product: [],
  total: {
    type: Number,

  },
  reason: {
    type: String,

  },
  upinumber: {
    type: String,

  },
  status: {
    type: String,
    default: RETURNORDER_STATUS.Waiting_Approval,
    enum: [
      RETURNORDER_STATUS.Waiting_Approval,
      RETURNORDER_STATUS.Rejected,
      RETURNORDER_STATUS.Approved
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model('Return', ReturnRequestSchema);
