import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import OrderAppointment from "./components/OrderAppointment";
import Referrals from "./components/Referrals";
import Prescriptions from "./components/Prescriptions";
import HomeD from "./components/HomeD";
import ReferralsReq from "./components/ReferralsReq";
import PrescriptionsReq from "./components/PrescriptionsReq";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import HomeContent from "./components/HomeContent";
import NewCardRequest from "./components/NewCardRequest";
import Pharmacy from "./components/pharmacy-components/Pharmacy";
import MedicinesWithPrescription from "./components/pharmacy-components/MedicinesWithPrescription";
import MedicinesWithoutPrescription from "./components/pharmacy-components/MedicinesWithuotPrescription";
import { CartProvider } from "./components/pharmacy-components/CartContext";
import Cart from "./components/pharmacy-components/Cart";
import Checkout from "./components/pharmacy-components/Checkout";
import DoctorHomeContent from "./components/DoctorHomeContent";
import PatientsOfDoctor from "./components/doctor-components/PatientsOfDoctor";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/home" element={<Home />}>
            <Route index element={<HomeContent />} /> 
            <Route path="orderAppointmet" element={<OrderAppointment />} />
            <Route path="orderNewCard" element={<NewCardRequest />} />
            <Route path="pharmacy" element={<Pharmacy />}>
              <Route path="" element={<Navigate to="without-prescription" />} />
              <Route
                path="with-prescription"
                element={<MedicinesWithPrescription />}
              />
              <Route
                path="without-prescription"
                element={<MedicinesWithoutPrescription />}
              />
              <Route path="cart" element={<Cart />}></Route>
              <Route path="checkout" element={<Checkout />}></Route>
            </Route>
            <Route path="myReferrals" element={<Referrals />} />
            <Route path="myPrescriptions" element={<Prescriptions />} />
          </Route>

          <Route path="/homeD" element={<HomeD />}>
            <Route index element={<DoctorHomeContent />} /> 
            <Route path="myPatients" element={<PatientsOfDoctor/>}></Route>
            <Route path="ReferralsReq" element={<ReferralsReq />} />
            <Route path="PrescriptionsReq" element={<PrescriptionsReq />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;


/*
<Route path="*" element={<Navigate to="/login" />} />

            <Route path="patientAppointment" element={<PatientAppointment />} />

*/