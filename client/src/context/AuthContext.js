import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';
import itemService from '../services/itemService';
import offerService from '../services/offerService';
import userService from '../services/userService'; // NEW
import { toast } from 'react-toastify';

const AuthContext = createContext(null);
const user = JSON.parse(localStorage.getItem('user'));

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(user || null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This effect runs once when the app loads to fetch the initial items
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const fetchedItems = await itemService.getItems();
        setItems(fetchedItems);
      } catch (error) {
        console.error("Failed to fetch items:", error);
        toast.error("Could not load items from the server.");
      }
      setIsLoading(false);
    };

    loadInitialData();
  }, []); // The empty array [] means this effect runs only once

  // --- AUTHENTICATION FUNCTIONS ---
  const login = async (userData) => {
    const user = await authService.login(userData);
    setCurrentUser(user);
    return user;
  };
  
  const register = async (userData) => {
    const user = await authService.register(userData);
    setCurrentUser(user);
    return user;
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const updateUser = (newUserData) => {
    setCurrentUser(prevUser => ({
      ...prevUser,
      ...newUserData
    }));
  };

  // --- ITEM FUNCTIONS ---
  const addItem = async (itemData) => {
    try {
      if (currentUser?.token) {
        const newItem = await itemService.createItem(itemData, currentUser.token);
        setItems(prevItems => [newItem, ...prevItems]);
      }
    } catch (error) {
      console.error("Failed to create item:", error);
      throw error; 
    }
  };

  const deleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        if (currentUser?.token) {
          await itemService.deleteItem(itemId, currentUser.token);
          setItems(prevItems => prevItems.filter(item => item._id !== itemId));
          toast.success('Post deleted successfully!');
        }
      } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete post.';
        toast.error(message);
      }
    }
  };

  const updateItem = async (itemId, updatedData) => {
    try {
      if (currentUser?.token) {
        const updatedItemFromServer = await itemService.updateItem(itemId, updatedData, currentUser.token);
        setItems(prevItems => 
          prevItems.map(item => 
            item._id === itemId ? updatedItemFromServer : item
          )
        );
      }
    } catch (error) {
      console.error("Failed to update item:", error);
      throw error;
    }
  };
  
  // --- OFFER FUNCTIONS ---
  const addOffer = async (offerData) => {
    try {
      if (currentUser?.token) {
        const newOffer = await offerService.createOffer(offerData.itemId, { message: offerData.message }, currentUser.token);
        return newOffer; // Return the new offer to the component
      }
    } catch (error) {
      console.error("Failed to create offer:", error);
      throw error;
    }
  };

  const deleteUserAccount = async () => {
    if (window.confirm('Are you absolutely sure? This will delete your account and all of your posts and offers. This cannot be undone.')) {
      try {
        if (currentUser?.token) {
          await userService.deleteUser(currentUser.token);
          logout(); // Log the user out after deletion
          toast.success('Your account has been deleted.');
        }
      } catch (error) {
        console.error("Failed to delete account:", error);
        throw error;
      }
    }
  };

  // The value object holds everything we want to share with our app
  const value = {
    currentUser,
    isLoading,
    items,
    login,
    register,
    logout,
    updateUser,
    addItem,
    deleteItem,
    updateItem,
    addOffer,
    deleteUserAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to make it easy to use the context in other components
export function useAuth() {
  return useContext(AuthContext);
}