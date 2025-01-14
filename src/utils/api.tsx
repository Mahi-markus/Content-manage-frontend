"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Ensure this matches your backend API URL

// Create an Axios instance
export const api = axios.create({
  baseURL: API_URL,
});

// Login function (for reuse elsewhere in your app)
export const login = (username: string, password: string) => {
  return api.post('/login/', { username, password });
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

const LogoutPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found.');
        }

        // Call the logout function with the token
        await logout(token);

        // Redirect to the login page after successful logout
        router.push('/login');
      } catch (error) {
        console.error('Logout failed', error);
      }
    };

    performLogout();
  }, [router]);

  return <div>Logging out...</div>;
};

export default LogoutPage;