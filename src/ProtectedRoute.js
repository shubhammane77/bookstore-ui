import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const userId = useSelector(state => state.user.userId);
  const token = useSelector(state => state.user.token);

  if (userId === 0 || token === '') {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;