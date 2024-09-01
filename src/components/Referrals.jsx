import React, { useState, useEffect } from 'react';
import styles from '../styles/Referrals.module.css';

function Referrals() {
  const [referrals, setReferrals] = useState([]);

  useEffect(() => {
    // Fetch the data from the server
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/patients/refferals?userID=1');
        const data = await response.json();
        setReferrals(data); // Save the data to the state
      } catch (error) {
        console.error('Error fetching referrals:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Referrals List</h2>
      <ul>
        {referrals.map((referral, index) => (
          <li key={index} className={styles.referral}>
            <div className={styles.referralDetails}>
              <p><strong>Referral ID:</strong> {referral.ReferralID}</p>
              <p><strong>Test Name:</strong> {referral.TestName}</p>
              <p><strong>Doctor Name:</strong> {referral.FirstName} {referral.LastName}</p>
              <p><strong>Notes:</strong> {referral.Notes}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Referrals;