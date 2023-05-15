import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./utils/ProtectedRoute";
import ManageUserPage from "./pages/ManageUserPage";
import ManageCarParkPage from "./pages/ManageCarParkPage";
const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<LogIn />} />
          <Route
            path="/home"
            element={
              <Protected isAuthenticated>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/manage-user"
            exact
            element={
              <Protected isAuthenticated>
                <ManageUserPage />
              </Protected>
            }
          />
          <Route
            path="/manage-carpark"
            element={
              <Protected isAuthenticated>
                <ManageCarParkPage />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
