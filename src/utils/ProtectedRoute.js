import { useEffect } from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

// function Protected({ isAuthenticated,  redirectPath = '/', children }) {
//  useEffect(() => {
//   const username = localStorage.getItem("username");
//   if(!username) window.location.href = redirectPath;
//  },[])
//   return children
// }

function Protected({ isAuthenticated,  redirectPath = "/", children }) {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
 }

export default Protected;