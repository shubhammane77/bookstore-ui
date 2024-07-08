import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const userId = useSelector(state => state.user.userId);

  if (userId === 0) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;