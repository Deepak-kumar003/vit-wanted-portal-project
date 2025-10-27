// server/controllers/itemController.js
const Item = require('../models/itemModel');
const User = require('../models/userModel');

// @desc   Get all items
// @route  GET /api/items
// @access Public
const getItems = async (req, res) => {
  const items = await Item.find({}).sort({ createdAt: -1 });
  res.status(200).json(items);
};

// @desc   Create a new item
// @route  POST /api/items
// @access Private
const createItem = async (req, res) => {
  // MODIFIED: Destructure imageUrl from the body
  const { name, description, category, budget, imageUrl } = req.body;

  if (!name || !description || !category) {
    res.status(400).json({ message: 'Please include all required fields' });
    return;
  }

  const item = await Item.create({
    name,
    description,
    category,
    budget: budget || '₹0',
    imageUrl: imageUrl || '', // MODIFIED: Save the imageUrl
    user: req.user.id,
  });

  res.status(201).json(item);
};

// @desc   Get a single item by ID
// @route  GET /api/items/:id
// @access Public
const getItemById = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }

  res.status(200).json(item);
};

// @desc   Update an item
// @route  PUT /api/items/:id
// @access Private
const updateItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }

  if (item.user.toString() !== req.user.id) {
    res.status(401).json({ message: 'User not authorized' });
    return;
  }

  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedItem);
};

// @desc   Delete an item
// @route  DELETE /api/items/:id
// @access Private
const deleteItem = async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (!item) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }
  
  if (item.user.toString() !== req.user.id) {
    res.status(401).json({ message: 'User not authorized' });
    return;
  }

  // THIS IS THE CORRECTED LINE
  await item.deleteOne();

  res.status(200).json({ id: req.params.id, message: 'Item removed' });
};



module.exports = {
  getItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
};