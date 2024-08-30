import React from 'react';
import { Outlet } from 'react-router-dom';
import DoctorNavB from './DoctorNavB';

const HomeD = () => {
  return ( // Add return statement here
    <>
      <div><DoctorNavB /></div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default HomeD;