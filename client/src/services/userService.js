// src/services/userService.js
import api from '../api/axiosConfig';

// We don't need to pass the ID, as the token identifies the user
const deleteUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // Call the new /profile route
  const response = await api.delete('/users/profile', config);
  return response.data;
};

const userService = {
  deleteUser,
};

export default userService;