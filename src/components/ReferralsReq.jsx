import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../styles/ReferralsReq.module.css'; // Adjust path as needed

const ReferralsReq = () => {
    const navigate = useNavigate();
    const [patientID, setPatientID] = useState('');
    const [testName, setTestName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [doctorID, setDoctorID] = useState('');

    useEffect(() => {
        const storedDoctor = JSON.parse(localStorage.getItem('doctor'));
        if (storedDoctor && storedDoctor.DoctorID) {
            setDoctorID(storedDoctor.DoctorID);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await fetch('http://localhost:3001/api/doctors/referrals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientID,
                    doctorID,
                    testName,
                    date,
                    location,
                    notes
                }),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || 'Failed to create referral');
            }

            setSuccess('Referral created successfully!');
         
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className={classes.container}>
            <h2>Create Referral</h2>
            <form onSubmit={handleSubmit}>
                <div className={classes.formGroup}>
                    <label htmlFor="patientID">Patient ID:</label>
                    <input
                        type="text"
                        id="patientID"
                        value={patientID}
                        onChange={(e) => setPatientID(e.target.value)}
                        required
                    />
                </div>
                <div className={classes.formGroup}>
                    <label htmlFor="testName">Test Name:</label>
                    <input
                        type="text"
                        id="testName"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                        required
                    />
                </div>
                <div className={classes.formGroup}>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className={classes.formGroup}>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className={classes.formGroup}>
                    <label htmlFor="notes">Notes:</label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                {error && <div className={classes.error}>{error}</div>}
                {success && <div className={classes.success}>{success}</div>}
                <button type="submit" className={classes.submitButton}>Create Referral</button>
            </form>
        </div>
    );
};

export default ReferralsReq;
