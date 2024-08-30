import React, { useState, useEffect } from 'react';

function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // שליפת פרטי הרופא מה-Local Storage
    const doctor = JSON.parse(localStorage.getItem('doctor'));

    if (doctor && doctor.DoctorID) {
      // שליחת בקשה לשרת לקבלת הפגישות העתידיות של הרופא
      const fetchAppointments = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/doctors/${doctor.DoctorID}/appointments`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setAppointments(data); // שמירת הפגישות בסטייט
        } catch (error) {
          setError('Error fetching appointments: ' + error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAppointments();
    } else {
      setError('Doctor ID is missing');
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Future Appointments</h2>
      {appointments.length === 0 ? (
        <p>No future appointments found.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.AppointmentID}>
              <p><strong>Patient:</strong> {appointment.PatientName}</p>
              <p><strong>Date:</strong> {new Date(appointment.Date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {new Date(appointment.Date).toLocaleTimeString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DoctorAppointments;
