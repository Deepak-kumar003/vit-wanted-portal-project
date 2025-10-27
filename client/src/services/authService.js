// src/services/authService.js
import api from '../api/axiosConfig';

// Register user
const register = async (userData) => {
  const response = await api.post('/users/register', userData);

  if (response.data) {
    // Save user data (including token) to localStorage
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
    const response = await api.post('/users/login', userData);
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Logout user
const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  logout,
};

export default authService;