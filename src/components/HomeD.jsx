import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DoctorNavB from '../components/DoctorNavB';
import { Outlet } from 'react-router-dom';

function HomeD() {
    return (
        <>
            <div><DoctorNavB /></div>
            <div>
                <Outlet />
            </div>
        </>
    );
}
export default HomeD;