import React, { useState, useEffect } from 'react';
import styles from '../../styles/PatientsOfDoctor.module.css';
import PatientDetails from './PatientDetails';
import PatientPrescriptions from './PatientPrescriptions';
import PatientReferrals from './PatientReferrals';
import { FaNoteSticky } from 'react-icons/fa6';

function PatientsOfDoctor() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientPrescriptions, setPatientPrescriptions] = useState([]);
  const [unapprovedRequests, setUnapprovedRequests] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [activeTab, setActiveTab] = useState('details');

  const doctor = JSON.parse(localStorage.getItem('doctor'));

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/doctors/patients?doctorID=${doctor.DoctorID}`);
        const data = await response.json();
        setPatients(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching patients:", error);
        setPatients([]);
      }
    };

    if (doctor?.DoctorID) {
      fetchPatients();
    }
  }, [doctor?.DoctorID]);

  const handlePatientChange = async (event) => {
    const userID = event.target.value;
    const patient = patients.find(p => p.UserID === parseInt(userID));
    setSelectedPatient(patient);

    if (userID) {
      try {
        // ייבוא המרשמים המאושרים עבור המטופל
        const responsePrescriptions = await fetch(`http://localhost:3001/api/patients/prescriptions?userID=${userID}`);
        const dataPrescriptions = await responsePrescriptions.json();
        setPatientPrescriptions(dataPrescriptions);

        // ייבוא בקשות המרשמים הלא מאושרות
        const responseUnapproved = await fetch(`http://localhost:3001/api/doctors/unapproved-prescription-requests?doctorID=${doctor.DoctorID}&patientID=${userID}`);
        const dataUnapproved = await responseUnapproved.json();
        setUnapprovedRequests(dataUnapproved);

        // ייבוא ההפניות של המטופל
        const responseReferrals = await fetch(`http://localhost:3001/api/patients/refferals?userID=${userID}`);
        const dataReferrals = await responseReferrals.json();
        setReferrals(dataReferrals);

      } catch (error) {
        console.error("Error fetching data:", error);
        setPatientPrescriptions([]);
        setUnapprovedRequests([]);
        setReferrals([]);
      }
    }
  };

  const approveRequest = async (requestID) => {
    try {
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 4);
  
      const creationDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
      const unapprovedRequest = unapprovedRequests.find(req => req.RequestID === requestID);
  
      // יצירת אובייקט מותאם אישית עם השם של התרופה והתאריכים המתאימים
      const newPrescription = {
        PrescriptionID: Date.now(),  // יוצרים מזהה זמני
        MedicineID: unapprovedRequest.MedicineID,
        MedicineName: unapprovedRequest.MedicineName,  // נניח שיש את השדה הזה ב-unapprovedRequest
        ExpirationDate: expirationDate.toISOString().split('T')[0],
        CreationDate: creationDate,
      };
  
      // שליחה לשרת כדי ליצור את המרשם בשרת
      const response = await fetch(`http://localhost:3001/api/doctors/prescriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientID: selectedPatient.UserID,
          doctorID: doctor.DoctorID,
          medicineID: newPrescription.MedicineID,
          expirationDate: newPrescription.ExpirationDate,
          creationDate: newPrescription.CreationDate,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to approve prescription request');
      }
  
      // עדכון רשימת המרשמים המאושרים באופן ידני עם האובייקט החדש
      setPatientPrescriptions([...patientPrescriptions, newPrescription]);
  
      // הסרת הבקשה הלא מאושרת מהרשימה
      setUnapprovedRequests(unapprovedRequests.filter(request => request.RequestID !== requestID));
  
    } catch (error) {
      console.error("Error approving prescription request:", error);
    }
  };
  
  const createReferral = async (newReferral) => {
    try {
      const referralData = {
        ...newReferral,
      patientID: selectedPatient.UserID,
        doctorID: doctor.DoctorID,
      };

      const response = await fetch(`http://localhost:3001/api/doctors/referrals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(referralData),
      });

      if (!response.ok) {
        throw new Error('Failed to create referral');
      }

      console.log(referralData);
      setReferrals([...referrals, 
        {
          Date: referralData.date,
          TestName: referralData.testName,
          Location: referralData.location,
          Notes: referralData.notes
        }
      ]);

    } catch (error) {
      console.error("Error creating referral:", error);
    }
  };

  return (
    <div>
    <h2 className={styles.title}>My Patients</h2>
    {patients.length > 0 ? (
        <div>
          <label htmlFor="patientSelect">Select a patient: </label>
          <select id="patientSelect" onChange={handlePatientChange}>
            <option value="">--Select a patient--</option>
            {patients.map((patient) => (
              <option key={patient.UserID} value={patient.UserID}>
                {patient.FirstName} {patient.LastName}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>No patients found.</p>
      )}
      {selectedPatient && (
        <div>
          <div className={styles.buttonGroup}>
            <button onClick={() => setActiveTab('details')} className={activeTab === 'details' ? styles.active : ''}>Details</button>
            <button onClick={() => setActiveTab('prescriptions')} className={activeTab === 'prescriptions' ? styles.active : ''}>Prescriptions</button>
            <button onClick={() => setActiveTab('referrals')} className={activeTab === 'referrals' ? styles.active : ''}>Referrals</button>
          </div>
          <div className={styles.tabContent}>
            {activeTab === 'details' && <PatientDetails patient={selectedPatient} />}
            {activeTab === 'prescriptions' && (
              <PatientPrescriptions 
                prescriptions={patientPrescriptions} 
                unapprovedRequests={unapprovedRequests} 
                approveRequest={approveRequest} 
              />
            )}
            {activeTab === 'referrals' && (
              <PatientReferrals 
                referrals={referrals} 
                createReferral={createReferral} 
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientsOfDoctor;
