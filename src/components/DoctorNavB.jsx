import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from '../styles/App.module.css';
import {FaUsers, FaHome, FaFileMedical, FaPrescriptionBottle, FaSignOutAlt } from 'react-icons/fa';

function DoctorNavB() {
  const handleLogout = async () => {
    const navigate = useNavigate();

    // Clear localStorage and wait for it to finish
    await new Promise((resolve) => {
        localStorage.clear();
        resolve();
    });

    // After clearing, navigate to the login page
    navigate('/login');
};
  return (
    <>
      <nav className={classes.navbar}>
        <ul className={classes.navLnk}>
          <li className={classes.liLnk}>
            <Link to="/homeD" className={classes.lnk}>
              <FaHome className={classes.icon} /> Home
            </Link>
          </li>
          <li className={classes.liLnk}>
          <Link to="myPatients" className={classes.lnk}>
            <FaUsers className={classes.icon} /> My Patients
          </Link>
        </li>      


          <li className={classes.liLnk}>
            <Link to="PrescriptionsReq" className={classes.lnk}>
              <FaPrescriptionBottle className={classes.icon} /> Prescriptions Requests
            </Link>
          </li>
          <li className={classes.liLnk}>
            <Link to="/login" className={classes.lnk} onClick={handleLogout}>
              <FaSignOutAlt className={classes.icon} /> Log Out
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default DoctorNavB;

