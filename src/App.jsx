import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";

import "./App.css";

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

/*
<Routes>
        <Route path='/' element={<Welcome></Welcome>}></Route>
        <Route path='login' element={<Login setUser={setUser}></Login>} />
        <Route path='register' element={<Register setUser={setUser}></Register>} />
        <Route path='registration-details' element={<RegistrationDetails setUser={setUser}></RegistrationDetails>} />

        <Route path='users/:userId' element={<SharedWrap></SharedWrap>}>
          <Route path='home' element={<Home user={user}></Home>}></Route>
          <Route path='albums' element={<Albums />}>
              <Route index element={<Albums />} />
          </Route>
          <Route path='albums/:albumId' element={<MyAlbum/>}></Route>
          <Route path='posts' element={<Posts />}>
              <Route index element={<Posts />} />
          </Route>         
          <Route path='todos' element={<Todos user={user}></Todos>}></Route>
      </Route>
    </Routes>
*/

export default App;
