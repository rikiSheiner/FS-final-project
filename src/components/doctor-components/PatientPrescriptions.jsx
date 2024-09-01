import React from 'react';
import styles from '../../styles/PatientsOfDoctor.module.css';

function PatientPrescriptions({ prescriptions, unapprovedRequests, approveRequest }) {

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Approved Prescriptions</h3>
      {prescriptions.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Prescription Date</th>
                <th>Medicine Name</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription) => (
                <tr key={prescription.PrescriptionID}>
                  <td>{new Date(prescription.ExpirationDate).toLocaleDateString()}</td>
                  <td>{prescription.MedicineName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No approved prescriptions found.</p>
      )}

      {unapprovedRequests.length > 0 && (
        <div className={styles.unapprovedSection}>
          <h4 className={styles.title}>Unapproved Prescription Requests</h4>
          {unapprovedRequests.map((request) => (
            <div key={request.RequestID} className={styles.requestCard}>
              <p><strong>Medicine Name:</strong> {request.MedicineName}</p>
              <button 
                className={styles.approveButton} 
                onClick={() => approveRequest(request.RequestID)}>
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PatientPrescriptions;
