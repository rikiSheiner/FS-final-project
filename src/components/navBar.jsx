import React from "react";
import { Outlet, Link } from "react-router-dom";
import classes from '../styles/App.module.css';
 function NavBar(){
    return(
        <>        
        <nav className={classes.navbar}>
        <ul className={classes.navLnk}>
          <li className={classes.liLnk}>
            <Link to="home" className={classes.lnk}>Home</Link>
          </li>
          <li className={classes.liLnk}>
            
            <Link to="orderAppointmet" className={classes.lnk}>orderAppointmet</Link>
          </li>
          <li className={classes.liLnk}>
            <Link to="orderNewCard" className={classes.lnk}>orderNewCard</Link>
          </li>
          <li className={classes.liLnk}>
            <Link to="pharmacy" className={classes.lnk}>Pharmacy</Link>
          </li>
          <li className={classes.liLnk}>
            <Link to="myReferrals" className={classes.lnk}>MyReferrals</Link>
          </li>
          <li className={classes.liLnk}>
            <Link to="myPrescriptions" className={classes.lnk}>MyPrescriptions</Link>
          </li>
          <li className={classes.liLnk}>
            <Link to="/login"className={classes.lnk} >LogOut</Link>
          </li>
        </ul>
      </nav> 
      </>

    )
 }
 export default NavBar;