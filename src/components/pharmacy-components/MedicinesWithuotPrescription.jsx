import { useState, useEffect } from 'react';
import ProductList from './ProductList';

function MedicinesWithoutPrescription() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/patients/medicines/without-prescription')  
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

export default MedicinesWithoutPrescription;
