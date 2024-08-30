import React, { useState, useEffect, lazy } from 'react';
import styles from '../styles/NewCardRequestStyles.module.css';

function NewCardRequest() {
  const [message, setMessage] = useState('');
  const [fullName, setFullName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [orderDate, setOrderDate] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    console.log('Current user: ' + currentUser.FirstName);

    if (currentUser) {
      setFullName(currentUser.firstName + ' ' + currentUser.lastName);
      setPatientId(currentUser.id);
      setOrderDate(new Date().toLocaleDateString());
    }
  }, []);

  const handleCreateRequest = async () => {
    try {
      console.log(patientId);
      const response = await fetch(`http://localhost:3001/api/patients/${patientId}/card-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patientId }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('New card request created successfully!');
        console.log(result);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>New Card Request</h2>
      <div className={styles.detailsRow}>

        <div className={styles.detailBox}>
        <p>Full Name</p>
        <p>{fullName}</p>
      </div>
        <div className={styles.detailBox}>
          <p>Order Date</p>
          <p>{orderDate}</p>
        </div>
        <div className={styles.detailBox}>
          <p>User ID</p>
          <p>{patientId}</p>
        </div>
      </div>
      <button 
        className={styles.button}
        onClick={handleCreateRequest}
      >
        Order Card
      </button>
      {message && (
        <p className={`${styles.message} ${message.includes('Error') ? styles.errorMessage : styles.successMessage}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default NewCardRequest;
