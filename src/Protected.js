import { Route, Navigate, Routes } from 'react-router-dom';

function Protected({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return children
}

export default Protected;