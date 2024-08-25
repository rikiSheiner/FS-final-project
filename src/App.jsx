import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup"
import Home from "./components/Home"
import "./styles/App.module.css";
import NavBar from "./components/navBar";
import Prespictions from "./components/Prespictions.JSX";
import Referrals from "./components/Referrals.JSX";
import Pharmacy from "./components/Pharmacy";
import NewCardRequest from "./components/NewCardRequest";
import OrderAppointment from "./components/OrderAppointment";
// WELCOME בהמשך 
// יעל  - 4 ראשונים 
// ריקי - 4 אחרונים


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />}>
          <Route path="orderAppointmet" element={<OrderAppointment />} />
          <Route path="orderNewCard" element={<NewCardRequest />} />
          <Route path="pharmacy" element={<Pharmacy />} />
          <Route path="myReferrals" element={<Referrals />} />
          <Route path="myPrescriptions" element={<Prespictions />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

