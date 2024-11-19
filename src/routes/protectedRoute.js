import React from 'react';
import { Navigate } from 'react-router-dom';

// Simulate an authentication check (you can replace this with actual auth logic)
const isAuthenticated = () => {
  // Check if token exists in localStorage (this can be modified for your own use case)
  return localStorage.getItem('authToken') !== null;
};

const ProtectedRoute = ({ element, redirectTo, allowAuthenticated }) => {
  // If the route should allow only authenticated users and the user is not authenticated, redirect to the login
  if (allowAuthenticated && isAuthenticated()) {
    return <Navigate to={redirectTo} />; // Redirect logged-in users from login/email routes
  }

  // If the route should allow only unauthenticated users and the user is authenticated, redirect to protected route
  if (!allowAuthenticated && !isAuthenticated()) {
    return <Navigate to="/emailverify" />; // Redirect unauthenticated users to login
  }

  return element;
};

export default ProtectedRoute;
