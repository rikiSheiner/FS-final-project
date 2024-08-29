import React, { useState, useEffect } from 'react';
import styles from '../styles/Prescriptions.module.css';

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user"));

        if (!currentUser || !currentUser.UserID) {
          throw new Error("User ID not found in local storage");
        }

        const response = await fetch(`http://localhost:3001/api/patients/prescriptions?userID=${currentUser.UserID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setPrescriptions(data);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch prescriptions");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/patients/medicines/with-prescription', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMedicines(data);
      } else {
        throw new Error("Failed to fetch medicines");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const requestPrescriptionRenewal = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("user"));

      if (!selectedMedicine) {
        alert("Please select a medicine");
        return;
      }
      const requestData = {
        PatientID: currentUser.UserID,
        MedicineID: selectedMedicine,
        Approved: 0 // לא מאושר
      };
      console.log(requestData);
      const response = await fetch(`http://localhost:3001/api/patients/prescription-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert("Prescription renewal requested successfully!");
      } else {
        throw new Error("Failed to request prescription renewal");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h2>Patient Prescriptions</h2>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found for this patient.</p>
      ) : (
        prescriptions.map((prescription, index) => (
          <div key={index} className={styles.prescription}>
            <div className={styles.prescriptionHeader}>Prescription</div>
            <div className={styles.prescriptionDetails}>
              <p><strong>Prescription ID:</strong> {prescription.PrescriptionID}</p>
              <p><strong>Creation Date:</strong> {new Date(prescription.CreationDate).toLocaleDateString()}</p>
              <p><strong>Expiration Date:</strong> {new Date(prescription.ExpirationDate).toLocaleDateString()}</p>
              <p><strong>Medicine Name:</strong> {prescription.MedicineName}</p>
              <p><strong>Doctor Name:</strong> Dr. {prescription.DoctorFirstName} {prescription.DoctorLastName}</p>
            </div>
          </div>
        ))
      )}

      <h3>Request Prescription Renewal</h3>
      <button className={styles.customButton} onClick={fetchMedicines}>Select Medicine for Renewal</button>
      {medicines.length > 0 && (
        <div>
          <select value={selectedMedicine} onChange={(e) => setSelectedMedicine(e.target.value)}>
            <option value="">Select a medicine</option>
            {medicines.map((medicine) => (
              <option key={medicine.MedicineID} value={medicine.MedicineID}>
                {medicine.Name}
              </option>
            ))}
          </select>
          <button className={styles.customButton} onClick={requestPrescriptionRenewal}>Request Renewal</button>
        </div>
      )}
    </div>
  );
}

export default Prescriptions;
