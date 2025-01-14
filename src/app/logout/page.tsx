"use client"; // Marking the file as a client component

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for App Router
import { logout } from '../../utils/api'; // Assuming logout function is imported from your utils

const LogoutPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.warn('No authentication token found. Redirecting to login page.');
          router.push('/login');
          return;
        }

        // Call the logout function with the token
        await logout(token); // Assuming your logout function requires the token

        // Remove the token from localStorage
        localStorage.removeItem('authToken');

        // Redirect to the login page after successful logout
        router.push('/login');
      } catch (error) {
        console.error('Logout failed', error);
        // Optionally, you can redirect to the login page even if logout fails
        router.push('/login');
      }
    };

    performLogout();
  }, [router]);

  return <div>Logging out...</div>;
};

export default LogoutPage;