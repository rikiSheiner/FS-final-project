import React, { useState, useEffect } from 'react';
import classes from '../styles/DoctorHomeContent.module.css';

function DoctorHomeContent() {
    const doctor = JSON.parse(localStorage.getItem('doctor'));
    const userDoctor = JSON.parse(localStorage.getItem('userdoctor'));

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
        const response = await fetch(`http://localhost:3001/api/doctors/appointments?doctorId=${doctor?.DoctorID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        if (doctor?.DoctorID) {
            fetchAppointments();
        }
    }, [doctor?.DoctorID]);

    return (
        <div className={classes.container}>
            <h1>Welcome, {userDoctor?.firstName} {userDoctor?.lastName}</h1>
            <div className={classes.appointmentsSection}>
                <h2>Upcoming Appointments</h2>
                {appointments.length > 0 ? (
                    <ul>
                        {appointments.map(appointment => (
                            <li key={appointment.AppointmentID} className={classes.appointment}>
                                <p>Patient: {appointment.UserID}</p>
                                <p>Date: {new Date(appointment.Date).toLocaleDateString()}</p>
                                <p>Time: {appointment.StartTime} - {appointment.EndTime}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No upcoming appointments.</p>
                )}
            </div>
        </div>
    );
}

export default DoctorHomeContent;
