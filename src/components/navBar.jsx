import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from '../styles/App.module.css';
// Import FontAwesome icons from react-icons/fa
import { FaHome, FaCalendarAlt, FaIdCard, FaPills, FaFileMedical, FaPrescriptionBottle, FaSignOutAlt } from 'react-icons/fa';

function NavBar() {
  const handleLogout = () => {
    const navigate = useNavigate();
    localStorage.clear();
    navigate('/login'); // Redirect to the login page after clearing localStorage
  };
  return (
    <>
      <nav className={classes.navbar}>
        <ul className={classes.navLnk}>
          <li className={classes.liLnk}>
            <Link to="/home" className={classes.lnk}>
              <FaHome className={classes.icon} /> Home
            </Link>
          </li>
          <li className={classes.liLnk}>
            <Link to="orderAppointmet" className={classes.lnk}>
              <FaCalendarAlt className={classes.icon} /> Order Appointment
            </Link>
          </li>
          <li className={classes.liLnk}>
            <Link to="orderNewCard" className={classes.lnk}>
              <FaIdCard className={classes.icon} /> Order New Card
            </Link>
          </li>
          <li className={classes.liLnk}>
            <Link to="pharmacy" className={classes.lnk}>
              <FaPills className={classes.icon} /> Pharmacy
            </Link>
          </li>
          <li className={classes.liLnk}>
            <Link to="myReferrals" className={classes.lnk}>
              <FaFileMedical className={classes.icon} /> My Referrals
            </Link>
          </li>
          <li className={classes.liLnk}>
            <Link to="myPrescriptions" className={classes.lnk}>
              <FaPrescriptionBottle className={classes.icon} /> My Prescriptions
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

export default NavBar;
