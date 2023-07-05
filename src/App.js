import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protected from "./utils/ProtectedRoute";
import ManageUserPage from "./pages/ManageUserPage";
import ManageCarParkPage from "./pages/ManageCarParkPage";
import SignUp from "./pages/SignUp";
import AddCarParkBuilding from "./pages/addCarParkBuilding";
import AddAdmin from "./pages/addAdmin";
import ManageReservation from "./pages/ManageReservation";

const App = () => {
  return (
    <div className="App" style={{ backgroundColor: "#003572", height: "100%" }}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<LogIn />} />
          <Route path="/sign-up" element={<SignUp />} />
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
            path="/manage-user/add"
            exact
            element={
              <Protected isAuthenticated>
                <AddAdmin />
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
          <Route
            path="/manage-reservation"
            element={
              <Protected isAuthenticated>
                <ManageReservation />
              </Protected>
            }
          />
          <Route
            path="/manage-carpark/add"
            element={
              <Protected isAuthenticated>
                <AddCarParkBuilding />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
