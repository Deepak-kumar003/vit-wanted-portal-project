const Offer = require('../models/offerModel');
const Item = require('../models/itemModel');
const User = require('../models/userModel');

// @desc   Get all offers for a specific item
// @route  GET /api/items/:itemId/offers
// @access Public
const getOffersForItem = async (req, res) => {
  // MODIFIED: Use .populate() to get the 'name' from the 'user'
  const offers = await Offer.find({ item: req.params.itemId })
    .populate('user', 'name') 
    .sort({ createdAt: -1 });
  res.status(200).json(offers);
};

// @desc   Create a new offer for an item
// @route  POST /api/items/:itemId/offers
// @access Private
const createOffer = async (req, res) => {
  const { message } = req.body;

  // Simple validation
  if (!message) {
    res.status(400).json({ message: 'Please add a message' });
    return;
  }
  
  // Find the item the offer is for
  const item = await Item.findById(req.params.itemId);
  if (!item) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }
  
  // A user cannot make an offer on their own post
  if (item.user.toString() === req.user.id) {
    res.status(400).json({ message: 'You cannot make an offer on your own post' });
    return;
  }

  const offer = await Offer.create({
    item: req.params.itemId,
    user: req.user.id, // The logged-in user from the 'protect' middleware
    message,
  });

  res.status(201).json(offer);
};

// @desc   Get all offers made by the logged-in user
// @route  GET /api/offers/myoffers
// @access Private
const getMyOffers = async (req, res) => {
  // MODIFIED: Also populate the item this offer is for
  const offers = await Offer.find({ user: req.user.id })
    .populate('item', 'name') // Get the item's name
    .sort({ createdAt: -1 });
  res.status(200).json(offers);
};

module.exports = {
  getOffersForItem,
  createOffer,
  getMyOffers,
};