import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import DoctorNavB from './DoctorNavB';
const HomeD = () => {
    <>
    <div><DoctorNavB /></div>
    <div>
        <Outlet />
    </div>
</>
};
export default HomeD;