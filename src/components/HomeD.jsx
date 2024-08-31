import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import DoctorNavB from "./DoctorNavB";

const HomeD = () => {
  return (
    <div>
      <div>
        <DoctorNavB />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default HomeD;
