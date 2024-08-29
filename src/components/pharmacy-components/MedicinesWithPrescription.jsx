/*import { useState, useEffect } from 'react';
import ProductList from './ProductList';

function MedicinesWithPrescription() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/patients/medicines/with-prescription')  
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data received from server:', data); 
        setMedicines(data);
      })
      .catch((error) => {
        console.error('Error fetching medicines:', error);
        setMedicines([]); 
      });
  }, []);

  return (
    <div>
      {medicines.length === 0 ? (
        <p>No medicines available</p>
      ) : (
        <ProductList products={medicines}></ProductList>
      )}
    </div>
  );
}

export default MedicinesWithPrescription;*/

import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import styles from '../../styles/pharmacy-styles/Pharmacy.module.css';

function MedicinesWithPrescription() {
  const [medicines, setMedicines] = useState([]);
  const [prescriptions, setPrescriptions] = useState({});

  useEffect(() => {
    // First fetch all the medicines that require a prescription
    fetch('http://localhost:3001/api/patients/medicines/with-prescription')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setMedicines(data);
        fetchUserPrescriptions(data);
      })
      .catch((error) => {
        console.error('Error fetching medicines:', error);
        setMedicines([]);
      });
  }, []);

  const fetchUserPrescriptions = async (medicines) => {
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

      console.log(response);
  
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
  
      const data = await response.json();

      // Ensure prescriptions is an array before using it
    // Ensure we are correctly extracting MedicineIDs from the returned prescription data
    const prescriptionList = data.map(prescription => prescription.MedicineID);

    // Map each medicine in the medicines array to whether it has a corresponding prescription
    const prescriptionData = medicines.reduce((acc, medicine) => {
      acc[medicine.MedicineID] = prescriptionList.includes(medicine.MedicineID);
      return acc;
    }, {});
  
      console.log(prescriptionData);


      setPrescriptions(prescriptionData);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    }
  };
  

  return (
    <div className={styles.medicineContainer}>
      {medicines.length === 0 ? (
        <p>No medicines available</p>
      ) : (
        <ProductList
          products={medicines}
          prescriptions={prescriptions} // Pass the prescriptions data
        />
      )}
    </div>
  );
}

export default MedicinesWithPrescription;
