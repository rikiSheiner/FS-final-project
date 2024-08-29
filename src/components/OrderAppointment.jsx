import React, { useState, useEffect } from "react";
import classes from '../styles/App.module.css';

function OrderAppointment() {
    const [professions, setProfessions] = useState([]);
    const [selectedProfession, setSelectedProfession] = useState("");
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        // Fetch professions on component mount
        fetch('http://localhost:3001/api/patients/professions')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                setProfessions(data); // Set professions data to state
            })
            .catch((error) => {
                console.error('Error fetching professions:', error);
                setProfessions([]);
            });
    }, []);

    useEffect(() => {
        if (selectedProfession) {
            console.log("Selected Profession:", selectedProfession); // Add this line
            const propName = "Profession"; // Ensure this is correctly mapped
            const propValue = selectedProfession;
            const fetchDoctors = async () => {
                try {
                    const response = await fetch('http://localhost:3001/api/doctors/filter', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ propName, propValue }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || "Failed to fetch doctors");
                    }

                    const data = await response.json();
                    setDoctors(data);
                } catch (error) {
                    console.error("Error fetching doctors:", error.message);
                    alert(`Error: ${error.message}`);
                }
            };

            fetchDoctors();
        }
    }, [selectedProfession]);

    useEffect(() => {
        if (selectedDoctor) {
          const doctorId = selectedDoctor;
          console.log("Fetching available times for doctor ID:", doctorId); // Debug log
      
          const fetchAvailableTimes = async () => {
            try {
              const response = await fetch('http://localhost:3001/api/patients/appointments/available', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ doctorId }),
              });
      
              if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch available times");
              }
      
              const data = await response.json();
              setAvailableTimes(data);
            } catch (error) {
              console.error("Error fetching available times:", error.message);
              alert(`Error: ${error.message}`);
            }
          };
      
          fetchAvailableTimes();
        }
      }, [selectedDoctor]);
      

    const handleProfessionChange = (event) => {
        setSelectedProfession(event.target.value);
        setDoctors([]);
        setAvailableTimes([]);
        setSelectedDoctor("");
        setSelectedTime(null);
    };

    const handleDoctorChange = (event) => {
        setSelectedDoctor(event.target.value);
        setAvailableTimes([]);
        setSelectedTime(null);
    };

    const formatDateForMySQL = (isoDateString) => {
        const date = new Date(isoDateString);
        return date.toISOString().slice(0, 19).replace('T', ' ');
    };

    const handleBookAppointment = async () => {
        if (!selectedTime || !user?.id) {
            alert("Please select a time slot and ensure you are logged in.");
            return;
        }
    
        try {
            // Create a Date object from the selectedTime.Date
            const appointmentDate = formatDateForMySQL(selectedTime.Date);
    
            const response = await fetch("http://localhost:3001/api/patients/appointments/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    availableTimeId: selectedTime.TimeID,
                    doctorId: selectedTime.DoctorID,
                    userId: user?.id,
                    date: appointmentDate, // Use the formatted ISO string
                    startTime: selectedTime.StartTime,
                    endTime: selectedTime.EndTime,
                }),
            });
    
            const result = await response.json();
            if (response.ok) {
                alert("Appointment booked successfully!");
                setAvailableTimes([]); // Clear available times after booking
            } else {
                alert(`Error booking appointment: ${result.message}`);
            }
        } catch (error) {
            console.error("Error booking appointment:", error);
        }
    };
    

    return (
        <div className={classes.orderAppointment}>
            <div className={classes.formGroup}>
                <h1>Order Appointment</h1>
                <label htmlFor="profession">Select Profession:</label>
                <select id="profession" value={selectedProfession} onChange={handleProfessionChange}>
                    <option value="">Select a profession</option>
                    {professions.map((profession, index) => (
                        <option key={index} value={profession}>{profession}</option>
                    ))}
                </select>
            </div>
            <div className={classes.formGroup}>
                <label htmlFor="doctor">Select Doctor:</label>
                <select id="doctor" value={selectedDoctor} onChange={handleDoctorChange}>
                    <option value="">Select a Doctor</option>
                    {doctors.map((doctor, index) => (
                        <option key={index} value={doctor.DoctorID}>
                            {`ClinicID: ${doctor.ClinicID}, Profession: ${doctor.Profession}, DoctorID: ${doctor.DoctorID}`}
                        </option>
                    ))}
                </select>
            </div>
            <div className={classes.formGroup}>
                <label htmlFor="availableTimes">Select Available Time:</label>
                <select
                    id="availableTimes"
                    value={selectedTime?.TimeID || ''}
                    onChange={(e) => {
                        const time = availableTimes.find(time => time.TimeID === parseInt(e.target.value));
                        setSelectedTime(time);
                    }}
                >
                    <option value="">Select a time</option>
                    {availableTimes.map((time) => (
                        <option key={time.TimeID} value={time.TimeID}>
                            {new Date(time.Date).toLocaleDateString()} - {time.StartTime} to {time.EndTime}
                        </option>
                    ))}
                </select>
                <button onClick={handleBookAppointment}>Book Appointment</button>
            </div>
        </div>
    );
}

export default OrderAppointment;



