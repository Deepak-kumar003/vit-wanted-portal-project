// server/models/offerModel.js
const mongoose = require('mongoose');

const offerSchema = mongoose.Schema(
  {
    // The item this offer is for
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Item',
    },
    // The user who made the offer
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    message: {
      type: String,
      required: [true, 'Please add an offer message'],
    },
    status: {
      type: String,
      required: true,
      default: 'pending', // Can be 'pending', 'accepted', 'rejected'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Offer', offerSchema);