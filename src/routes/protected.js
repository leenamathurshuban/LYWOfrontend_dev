import React from 'react';
import { Navigate } from 'react-router-dom';

const isApplicant = () => {
  return localStorage.getItem('applicantToken') !== null;
  // return sessionStorage.getItem('applicantToken') !== null;
};
const Protected = ({ element, redirectTo, allowAuthenticated }) => {
  if (allowAuthenticated && isApplicant()) {
    return <Navigate to={redirectTo} />;
  }
  if (!allowAuthenticated && !isApplicant()) {
    // return <Navigate to="/JobPosts/:id" />;
    return <Navigate to="/JobPosts" />;
  }
  return element;
};

export default Protected;
