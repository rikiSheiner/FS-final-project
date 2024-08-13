import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";

import "./App.css";


// WELCOME בהמשך 
// יעל  - 4 ראשונים 
// ריקי - 4 אחרונים

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome></Welcome>}></Route>
        
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="home" element={<Home user={user}></Home>}>
          <Route
            path="/orderAppointmet"
            element={<OrderAppointment></OrderAppointment>}
          ></Route>
          <Route
            path="/orderNewCard"
            element={<NewCardRequest></NewCardRequest>}
          ></Route>
          <Route path="/pharmacy" element={<Pharmacy></Pharmacy>}></Route>
          <Route path="/myReferrals" element={<Referrals></Referrals>}></Route>
          <Route
            path="/myPrescriptions"
            element={<Prespictions></Prespictions>}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
