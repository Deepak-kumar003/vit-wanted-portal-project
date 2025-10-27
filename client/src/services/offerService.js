// src/services/offerService.js
import api from '../api/axiosConfig';

// Get all offers for a single item
const getOffersForItem = async (itemId) => {
  const response = await api.get(`/items/${itemId}/offers`);
  return response.data;
};

// Create a new offer for an item
const createOffer = async (itemId, offerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.post(`/items/${itemId}/offers`, offerData, config);
  return response.data;
};

const getMyOffers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api.get('/offers/myoffers', config);
  return response.data;
};

const offerService = {
  getOffersForItem,
  createOffer,
  getMyOffers,
};

export default offerService;