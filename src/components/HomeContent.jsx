import React, { useState, useEffect } from 'react';
import classes from '../styles/HomeContent.module.css'; // עדכון הייבוא ל-CSS החדש
import { FaRunning, FaSyringe, FaInfoCircle } from 'react-icons/fa';

function HomeContent() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [appointments, setAppointments] = useState([]);
    const [doctorProfessions, setDoctorProfessions] = useState({});

    useEffect(() => {
        // Fetch appointments and other data
    }, [user?.id]);

    function getGreeting() {
        const now = new Date();
        const hour = now.getHours();

        if (hour < 12) {
            return 'Good Morning';
        } else if (hour < 18) {
            return 'Good Afternoon';
        } else {
            return 'Good Evening';
        }
    }

    return (
        <>
            <div className={classes.homep}>
                <h1>{getGreeting()} {user?.firstName}</h1>
                <div className={classes.gridContainer}>
                    <div className={classes.menu}>
                        <h2>Upcoming Appointments</h2>
                        <div>
                            {appointments.length > 0 ? (
                                appointments.map((appointment) => (
                                    <div key={appointment.AppointmentID} className={classes.appointmentBox}>
                                        <p>Date: {new Date(appointment.Date).toLocaleDateString()}</p>
                                        <p>Time: {appointment.StartTime} - {appointment.EndTime}</p>
                                        <p>Doctor Profession: {doctorProfessions[appointment.DoctorID]}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No upcoming appointments.</p>
                            )}
                        </div>
                    </div>
                    <div className={classes.main}>
                        <h3>Health Resources</h3>
                        <div className={classes.resourceList}>
                            <div className={classes.resourceItem}>
                                <FaRunning className={classes.resourceIcon} />
                                <a href="https://www.1907.foundation/health/exercise-as-medicine?utm_term=exercise%20and%20mental%20health&utm_campaign=&utm_source=adwords&utm_medium=ppc&hsa_acc=9125771043&hsa_cam=15271885915&hsa_grp=133963705102&hsa_ad=597768905257&hsa_src=g&hsa_tgt=kwd-296570712646&hsa_kw=exercise%20and%20mental%20health&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=Cj0KCQjwrKu2BhDkARIsAD7GBovSZw5a0HEzwNMt1YP65ou9_-OBLH83E6CrjuFVh7zqjDHf1BFfkh4aAu60EALw_wcB" target="_blank" rel="noopener noreferrer">
                                    Exercise as Medicine
                                </a>
                                <p>Discover the benefits of exercise for mental health and overall well-being.</p>
                            </div>
                            <div className={classes.resourceItem}>
                                <FaSyringe className={classes.resourceIcon} />
                                <a href="https://www.cdc.gov/flu/prevent/flushot.htm" target="_blank" rel="noopener noreferrer">
                                    Flu Vaccination
                                </a>
                                <p>Learn why getting a flu shot is important for your health.</p>
                            </div>
                            <div className={classes.resourceItem}>
                                <FaInfoCircle className={classes.resourceIcon} />
                                <a href="https://www.webmd.com/diabetes/news/20240822/extreme-low-calorie-diet-may-end-diabetes-is-it-safe" target="_blank" rel="noopener noreferrer">
                                    Extreme Low-Calorie Diet
                                </a>
                                <p>Read about how an extreme low-calorie diet might help manage diabetes and its safety.</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.right}>
                        Do you<br /> need your<br /> doctor's clinic?
                        <br /><br /> <h4>contact us *2800</h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeContent;
