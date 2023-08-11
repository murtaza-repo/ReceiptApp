import React from 'react'
import { Navigate } from 'react-router-dom';

function Protected({ isSignedIn, children }) {

  let authToken = localStorage.getItem('authToken');
  if (!authToken) {
    return <Navigate to="/" replace />
  }
  return children;
}
export default Protected;
