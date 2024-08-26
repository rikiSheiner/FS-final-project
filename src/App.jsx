import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import HomeContent from './components/HomeContent';
import OrderAppointment from './components/OrderAppointment';
import NewCardRequest from './components/NewCardRequest';
import Pharmacy from './components/Pharmacy';
import Referrals from './components/Referrals.JSX'
import Prescriptions from './components/Prescriptions';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<HomeContent />} /> {/* Default content */}
          <Route path="orderAppointmet" element={<OrderAppointment />} />
          <Route path="orderNewCard" element={<NewCardRequest />} />
          <Route path="pharmacy" element={<Pharmacy />} />
          <Route path="myReferrals" element={<Referrals />} />
          <Route path="myPrescriptions" element={<Prescriptions />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


