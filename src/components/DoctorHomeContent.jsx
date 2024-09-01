import React, { useState, useEffect } from 'react';
import classes from '../styles/DoctorHomeContent.module.css';

function DoctorHomeContent() {
    const doctor = JSON.parse(localStorage.getItem('doctor'));
    const userDoctor = JSON.parse(localStorage.getItem('userdoctor'));

    const [appointments, setAppointments] = useState([]);
    const [appointmentsToday, setAppointmentsToday] = useState(0);
    const [unapprovedPrescriptions, setUnapprovedPrescriptions] = useState(0);
    const [patientCount, setPatientCount] = useState(0);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/doctors/statistics?doctorId=${doctor?.DoctorID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch statistics');
                }
                const data = await response.json();
                setAppointmentsToday(data.appointmentsToday);
                setUnapprovedPrescriptions(data.unapprovedPrescriptions);
                setPatientCount(data.patientCount);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        const fetchAppointments = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/doctors/future-appointments?doctorId=${doctor?.DoctorID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch appointments');
                }
                let data = await response.json();

               
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        if (doctor?.DoctorID) {
            fetchStatistics();
            fetchAppointments();
        }
    }, [doctor?.DoctorID]);

    return (
        <div className={classes.container}>
            <h1>Welcome, {userDoctor?.firstName} {userDoctor?.lastName}</h1>
            <div className={classes.statisticsSection}>
                <div className={classes.statisticItem}>
                    <h2>Appointments Today</h2>
                    <p>{appointmentsToday}</p>
                </div>
                <div className={classes.statisticItem}>
                    <h2>Unapproved Prescriptions</h2>
                    <p>{unapprovedPrescriptions}</p>
                </div>
                <div className={classes.statisticItem}>
                    <h2>Total Patients</h2>
                    <p>{patientCount}</p>
                </div>
            </div>
            <div className={classes.appointmentsSection}>
                <h2>Upcoming Appointments</h2>
                {appointments.length > 0 ? (
                    <ul>
                        {appointments.map(appointment => (
                            <li key={appointment.AppointmentID} className={classes.appointment}>
                                <p>Patient: {appointment.FirstName} {appointment.LastName}</p>
                                <p>Email: {appointment.Email}</p>
                                <p>Phone: {appointment.Phone}</p>
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
