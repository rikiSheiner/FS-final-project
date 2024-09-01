import React, { useState, useEffect } from 'react';
import classes from '../styles/prescriptionReq.module.css';

function PrescriptionsReq() {
    const [doctor, setDoctor] = useState(JSON.parse(localStorage.getItem('doctor')));
    const [prescriptions, setPrescriptions] = useState([]);
    const [filter, setFilter] = useState('all'); // New state for filter type

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/doctors/prescriptions?id=${doctor?.DoctorID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setPrescriptions(data);

            } catch (error) {
                console.error('Error fetching prescriptions:', error);
            }
        };

        if (doctor?.DoctorID) {
            fetchPrescriptions();
        }
    }, [doctor?.DoctorID]);

    const handleApprove = async (requestID) => {
        try {
            const prescriptionToApprove = prescriptions.find(p => p.RequestID === requestID);

            if (!prescriptionToApprove) {
                throw new Error('Prescription request not found');
            }

            const today = new Date();
            const expirationDate = new Date(today);
            expirationDate.setDate(today.getDate() + 21);

            const creationDateISO = today.toISOString().split('T')[0];
            const expirationDateISO = expirationDate.toISOString().split('T')[0];

            const prescriptionResponse = await fetch('http://localhost:3001/api/doctors/prescriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientID: prescriptionToApprove.PatientID,
                    doctorID: doctor?.DoctorID,
                    medicineID: prescriptionToApprove.MedicineID,
                    expirationDate: expirationDateISO,
                    creationDate: creationDateISO,
                }),
            });

            if (!prescriptionResponse.ok) {
                const responseBody = await prescriptionResponse.json();
                throw new Error(`Error creating prescription: ${responseBody.message}`);
            }

            const updateResponse = await fetch('http://localhost:3001/api/doctors/approvedAlter', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestID: requestID }),
            });

            if (!updateResponse.ok) {
                const responseBody = await updateResponse.json();
                throw new Error(`Error updating prescription status: ${responseBody.message}`);
            }

            // Refresh the prescriptions list
            const updatedPrescriptions = prescriptions.map((prescription) =>
                prescription.RequestID === requestID
                    ? { ...prescription, Approved: true }
                    : prescription
            );
            setPrescriptions(updatedPrescriptions);
        } catch (error) {
            console.error('Error processing approval:', error);
        }
    };

    const filteredPrescriptions = prescriptions.filter(prescription => {
        if (filter === 'approved') {
            return prescription.Approved;
        } else if (filter === 'not-approved') {
            return !prescription.Approved;
        }
        return true;
    });

    return (
        <div className={classes.container}>
            <h2>Prescription Requests</h2>
            <div className={classes.buttonContainer}>
                <button onClick={() => setFilter('all')} className={classes.filterButton}>All</button>
                <button onClick={() => setFilter('approved')} className={classes.filterButton}>Approved</button>
                <button onClick={() => setFilter('not-approved')} className={classes.filterButton}>Not Approved</button>
            </div>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Patient Name</th> {/* Show Patient Name */}
                        <th>Medicine Name</th> {/* Show Medicine Name */}
                        <th>Approved</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPrescriptions.map((prescription) => (
                        <tr key={prescription.RequestID}>
                            <td>{prescription.RequestID}</td>
                            <td>{prescription.FirstName} {prescription.LastName}</td> {/* Display Patient Name */}
                            <td>{prescription.MedicineName}</td> {/* Display Medicine Name */}
                            <td>{prescription.Approved ? 'Yes' : 'No'}</td>
                            <td>
                                {!prescription.Approved && (
                                    <button
                                        onClick={() => handleApprove(prescription.RequestID)}
                                        className={classes.approveButton}
                                    >
                                        Approve
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PrescriptionsReq;
