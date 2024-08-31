import React, { useState, useEffect } from "react";

function PatientsOfDoctor() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientDetails, setPatientDetails] = useState(null);

  const doctor = JSON.parse(localStorage.getItem('doctor')); // Assuming the doctor's ID is stored in localStorage

  useEffect(() => {
    // Fetch the list of patients for the doctor
    const fetchPatients = async () => {
      try {
        const response = await fetch(`/api/doctors/${doctor?.DoctorID}/patients`);
        if (!response.ok) {
          throw new Error('Failed to fetch patients');
        }
        const data = await response.json();
        // Ensure that the response data is an array
        if (Array.isArray(data)) {
          setPatients(data);
        } else {
          console.error("Expected an array but got:", data);
          setPatients([]); // Set to empty array if not an array
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
        setPatients([]); // Set to empty array in case of error
      }
    };

    if (doctor?.DoctorID) {
      fetchPatients();
    }
  }, [doctor?.DoctorID]);

  const handlePatientSelect = async (patient) => {
    setSelectedPatient(patient);
    try {
      const response = await fetch(`/api/patients/${patient.UserID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch patient details');
      }
      const data = await response.json();
      setPatientDetails(data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
      setPatientDetails(null); // Reset patient details on error
    }
  };

  return (
    <div>
      <h2>My Patients</h2>
      {patients.length > 0 ? (
        <ul>
          {patients.map((patient) => (
            <li key={patient.UserID} onClick={() => handlePatientSelect(patient)}>
              {patient.firstName} {patient.lastName}
            </li>
          ))}
        </ul>
      ) : (
        <p>No patients found.</p>
      )}
      {selectedPatient && patientDetails && (
        <div>
          <h3>Details for {selectedPatient.firstName} {selectedPatient.lastName}</h3>
          <p>ID: {patientDetails.UserID}</p>
          <p>Email: {patientDetails.email}</p>
          <p>Phone: {patientDetails.phone}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
}

export default PatientsOfDoctor;
