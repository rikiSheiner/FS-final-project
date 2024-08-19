import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import OrderAppointment from "./components/OrderAppointment";
import Referrals from "./components/Referrals";
import Prescriptions from "./components/Prescriptions";
import NewCardRequest from "./components/NewCardRequest";
import Pharmacy from "./components/pharmacy-components/Pharmacy";
import MedicinesWithPrescription from "./components/pharmacy-components/MedicinesWithPrescription";
import MedicinesWithoutPrescription from "./components/pharmacy-components/MedicinesWithuotPrescription";

import "./App.css";

// WELCOME בהמשך
// יעל  - 4 ראשונים
// ריקי - 4 אחרונים

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome></Welcome>}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>

        <Route path="/home" element={<Home /*user={user}*/></Home>}>
          <Route
            path="orderAppointmet"
            element={<OrderAppointment></OrderAppointment>}
          ></Route>
          <Route
            path="orderNewCard"
            element={<NewCardRequest></NewCardRequest>}
          ></Route>

          <Route path="pharmacy" element={<Pharmacy />}>
          {/*  <Route path="" element={<Navigate to="without-prescription" />} />*/} 
         
            <Route
              path="with-prescription"
              element={<MedicinesWithPrescription />}
            />
            <Route
              path="without-prescription"
              element={<MedicinesWithoutPrescription />}
            />
          </Route>

          <Route path="myReferrals" element={<Referrals></Referrals>}></Route>
          <Route
            path="myPrescriptions"
            element={<Prescriptions></Prescriptions>}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
