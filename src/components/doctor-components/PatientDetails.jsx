import React from 'react';
import styles from '../../styles/PatientsOfDoctor.module.css';

function PatientDetails({ patient }) {
  return (
    <div className={styles.patientDetails}>
      <h3 className={styles.title}>Patient Details</h3>
      <p><strong>ID:</strong> {patient.UserID}</p>
      <p><strong>Name:</strong> {patient.FirstName} {patient.LastName}</p>
      <p><strong>Email:</strong> {patient.Email}</p>
      <p><strong>Phone:</strong> {patient.Phone}</p>
      <p><strong>Birth Date:</strong> {new Date(patient.BirthDate).toLocaleDateString()}</p>
    </div>
  );
}

export default PatientDetails;
