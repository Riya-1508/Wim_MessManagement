import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import "./index.css";
import Home from "./home.js";
import Login from "./Login.js";
import SignUp from "./SignUp.js";
import Application from "./Aform.js";
import Navigation from "./Navigation.js";
import reportWebVitals from "./reportWebVitals";
import ForgotPassword from "./ForgotPassword";
import PasswordReset from "./ResetPassword";
import Slip from "./Slip";
import GenerateSlip from "./GenerateSlip";
import LeaveForm from "./LeaveForm.js";
import ApplicationEdit from "./AformEdit";
import Menus from "./lib/Menus/Menus";
import AboutUs from "./lib/About/AboutUs";
import Review from "./ReviewForm.js"
import ReviewChart from "./ReviewChart.js"
const isAuthenticated = true;
// const isAuthenticated = localStorage.getItem("token");
const WebPages = () => {
  document.title = "VJTI Mess Management";
  return (
    <section className="listofwebpages">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Signup" element={<SignUp />} />
          <Route path="Login" element={<Login />} />
          <Route path="Menu" element={<Menus />} />
          <Route path="/Review" element={<Review />} />
          <Route path="AboutUs" element={<AboutUs />} />
          <Route path="/ReviewAnalysis" element={<ReviewChart />} />

          {isAuthenticated ? (
            <Route path="ApplicationForm" element={<Application />} />
          ) : (
            <Navigate to="/Login" replace />
          )}
          {isAuthenticated ? (
            <Route path="ApplicationFormEdit" element={<ApplicationEdit />} />
          ) : (
            <Navigate to="/Login" replace />
          )}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/password-reset/:id/:token"
            element={<PasswordReset />}
          />
          {isAuthenticated ? (
            <Route path="/slip" element={<Slip />} />
          ) : (
            <Navigate to="/Login" replace />
          )}

          <Route path="/leave" element={<LeaveForm />} />

          <Route path="/generateSlip" element={<GenerateSlip />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Login /> */}
    {/* <SignUp /> */}
    {/* <Application /> */}
    {/* <Home /> */}
    <WebPages />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
