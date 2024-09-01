import React, { useState } from 'react';
import styles from '../../styles/PatientsOfDoctor.module.css';

function PatientReferrals({ referrals, createReferral }) {
  const [newReferral, setNewReferral] = useState({ testName: '', date: '', location: '', notes: '' });

  const handleReferralChange = (e) => {
    setNewReferral({
      ...newReferral,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateReferral = (e) => {
    e.preventDefault();
    createReferral(newReferral);
    setNewReferral({ testName: '', date: '', location: '', notes: '' }); // איפוס הטופס לאחר יצירה
  };

  return (
    <div>
      <h3 className={styles.title}>Patient Referrals</h3>
      {referrals.length > 0 ? (
        <ul className={styles.referralList}>
          {referrals.map((referral) => (
            <li key={referral.ReferralID} className={styles.referralItem}>
              <p><strong>Test Name:</strong> {referral.TestName}</p>
              <p><strong>Date:</strong> {new Date(referral.Date).toLocaleDateString()}</p>
              <p><strong>Location:</strong> {referral.Location}</p>
              {referral.Notes && (
                <p><strong>Notes:</strong> {referral.Notes}</p>
              )}            </li>
          ))}
        </ul>
      ) : (
        <p>No referrals found.</p>
      )}

      <h4>Create New Referral</h4>
      <form onSubmit={handleCreateReferral} className={styles.referralForm}>
        <div className={styles.formGroup}>
          <label>Test Name:</label>
          <input
            type="text"
            name="testName"
            value={newReferral.testName}
            onChange={handleReferralChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={newReferral.date}
            onChange={handleReferralChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={newReferral.location}
            onChange={handleReferralChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={newReferral.notes}
            onChange={handleReferralChange}
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles.createButton}>Create Referral</button>
      </form>
    </div>
  );
}

export default PatientReferrals;
