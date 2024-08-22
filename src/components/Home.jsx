import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./navBar";
import classes from '../styles/App.module.css';
function Home() {
    return (<>
    <NavBar></NavBar>
        <div className={classes.homep}>
            <h1>עמוד הבית</h1>
        </div></>)
}

export default Home;