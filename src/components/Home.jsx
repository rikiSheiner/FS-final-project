
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './navBar';
import classes from '../styles/App.module.css';

function Home() {
    return (
        <>
            <div><NavBar /></div>
            <div>
                <Outlet />
            </div>
        </>
    );
}

export default Home;
