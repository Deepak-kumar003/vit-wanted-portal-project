// src/api/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // The base URL of your backend
});

export default api;