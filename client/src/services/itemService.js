// src/services/itemService.js
import api from '../api/axiosConfig';

// Get all items
const getItems = async () => {
  const response = await api.get('/items');
  return response.data;
};

const createItem = async (itemData, token) => {
  // The token is required to access this protected route
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.post('/items', itemData, config);
  return response.data;
};

const deleteItem = async (itemId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.delete(`/items/${itemId}`, config);
  return response.data;
};

const updateItem = async (itemId, itemData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await api.put(`/items/${itemId}`, itemData, config);
  return response.data;
};

const getItemById = async (itemId) => {
  const response = await api.get(`/items/${itemId}`);
  return response.data;
};

const itemService = {
  getItems,
  createItem,
  deleteItem,
  updateItem,
  getItemById,
};

export default itemService;