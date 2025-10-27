// server/routes/offerRoutes.js
const express = require('express');
// This option allows us to access parameters from the parent router (e.g., :itemId from itemRoutes)
const router = express.Router({ mergeParams: true });
const { getOffersForItem, createOffer } = require('../controllers/offerController');
const { protect } = require('../middleware/authMiddleware');
const { getMyOffers } = require('../controllers/offerController');

router.route('/')
  .get(getOffersForItem)
  .post(protect, createOffer);
  
router.route('/myoffers').get(protect, getMyOffers);

module.exports = router;