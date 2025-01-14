"use client";

import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Ensure this matches your backend API URL

// Create an Axios instance
export const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token in all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Login function (for reuse elsewhere in your app)
export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/login/', { username, password });
    const { access } = response.data.tokens;
    localStorage.setItem('authToken', access);
    return response.data;
  } catch (error) {
    console.error('Login failed', error);
    throw error;
  }
};

// Define the logout function that will handle API request
export const logout = async (token: string) => {
  try {
    await api.post('/logout/', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    localStorage.removeItem('authToken'); // Remove the token from localStorage after logout
  } catch (error) {
    console.error('Logout failed', error);
    throw error; // Re-throw the error to be caught in the useEffect
  }
};