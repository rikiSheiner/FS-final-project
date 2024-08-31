import React, { useState, useEffect } from 'react';
import classes from '../styles/prescriptionReq.module.css';

function PrescriptionsReq() {
    const [doctor, setDoctor] = useState(JSON.parse(localStorage.getItem('doctor')));
    const [prescriptions, setPrescriptions] = useState([]);
    const [medicineNames, setMedicineNames] = useState({});

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/doctors/get/Prescriptions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: doctor?.DoctorID }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setPrescriptions(data);

                // Fetch medicine names
                const fetchMedicineNames = async () => {
                    const names = {};
                    for (const prescription of data) {
                        if (!names[prescription.MedicineID]) {
                            const name = await fetchMedicineName(prescription.MedicineID);
                            names[prescription.MedicineID] = name;
                        }
                    }
                    setMedicineNames(names);
                };

                fetchMedicineNames();

            } catch (error) {
                console.error('Error fetching prescriptions:', error);
            }
        };

        if (doctor?.DoctorID) {
            fetchPrescriptions();
        }
    }, [doctor?.DoctorID]);

    const fetchMedicineName = async (medicineID) => {
        try {
            const response = await fetch('http://localhost:3001/api/doctors/getMedName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ MedicineID: medicineID }), // Send MedicineID
            });
            const data = await response.json();
            return data.Name; // Adjust based on your actual API response
        } catch (error) {
            console.error('Error fetching medicine name:', error);
            return 'Unknown'; // Default value in case of error
        }
    };

    const handleApprove = async (requestID) => {
        try {
            const prescriptionToApprove = prescriptions.find(p => p.RequestID === requestID);
    
            if (!prescriptionToApprove) {
                throw new Error('Prescription request not found');
            }
    
            const today = new Date();
            const expirationDate = new Date(today); // Create a new Date object to avoid modifying the original date
            expirationDate.setDate(today.getDate() + 21);
    
            // Use ISO format for dates
            const creationDateISO = today.toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'
            const expirationDateISO = expirationDate.toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'
    
            const prescriptionResponse = await fetch('http://localhost:3001/api/doctors/prescriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientID: prescriptionToApprove.PatientID,
                    doctorID: doctor?.DoctorID, // Assuming you want to use the current doctor's ID
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
    
    

    return (
        <div className={classes.container}>
            <h2>Prescription Requests</h2>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Patient ID</th>
                        <th>Medicine Name</th> {/* Updated to show Medicine Name */}
                        <th>Approved</th>
                        <th>Action</th> {/* New column for the button */}
                    </tr>
                </thead>
                <tbody>
                    {prescriptions.map((prescription) => (
                        <tr key={prescription.RequestID}>
                            <td>id :{prescription.RequestID}</td>
                            <td>patient :{prescription.PatientID}</td>
                            <td>name :{medicineNames[prescription.MedicineID]}</td> {/* Displaying Medicine Name */}
                            <td>status :{prescription.Approved ? 'Yes' : 'No'}</td>
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


