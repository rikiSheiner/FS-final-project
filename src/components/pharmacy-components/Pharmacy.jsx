import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styles from '../../styles/pharmacy-styles/Pharmacy.module.css';

const Pharmacy = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Online Store</h1>
      </header>
      <nav className={styles.nav}>
        <Link to="without-prescription" className={styles.navLink}>
          Non-Prescription Medicines
        </Link>
        <Link to="with-prescription" className={styles.navLink}>
          Prescription Medicines
        </Link>
        <Link to="cart" className={styles.navLink}>
          Shopping Cart
        </Link>
      </nav>
      <main>
        {/* Default to without-prescription if no subpage is selected */}
        <Outlet />
      </main>
    </div>
  );
};

export default Pharmacy;
