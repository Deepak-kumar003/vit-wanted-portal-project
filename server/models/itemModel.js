// server/models/itemModel.js
const mongoose = require('mongoose');

const itemSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add an item name/title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    budget: {
      type: String,
      default: '₹0',
    },
    imageUrl: { // NEW: Field to store the image URL
      type: String,
      default: '',
    },
    status: {
      type: String,
      required: true,
      default: 'open',
    },
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Item', itemSchema);