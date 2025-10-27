// server/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const { 
  getItems, 
  createItem, 
  getItemById, 
  updateItem, 
  deleteItem 
} = require('../controllers/itemController');
const { protect } = require('../middleware/authMiddleware');

// Import the offer router
const offerRouter = require('./offerRoutes');

// --- CORRECT ROUTE ORDER ---

// Route for getting all items and creating a new one
router.route('/')
  .get(getItems)
  .post(protect, createItem);

// THIS IS THE KEY CHANGE:
// The nested route for offers must come BEFORE the generic '/:id' route.
// This ensures that a request to '/:itemId/offers' is handled by the offerRouter.
router.use('/:itemId/offers', offerRouter);

// The generic route for a single item must come LAST.
// If it were first, it would incorrectly match the '/:itemId' part of the offers route.
router.route('/:id')
  .get(getItemById)
  .put(protect, updateItem)
  .delete(protect, deleteItem);

module.exports = router;