import React, { useState, useEffect } from "react";
import classes from '../styles/App.module.css';

function OrderAppointment() {
  const [professions, setProfessions] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState("");
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
      const fetchAvailableTimes = async () => {
        try {
          const response = await fetch(`http://localhost:3001/api/patients/appointments/available`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedProfession }),
          });
  
          // Check if the response is not ok (e.g., 404, 500)
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch available times");
          }
  
          const data = await response.json();
          setAvailableTimes(data);
        } catch (error) {
          // Log the detailed error message
          console.error("Error fetching available times:", error.message);
          alert(`Error: ${error.message}`); // Display the error to the user
        }
      };
  
      fetchAvailableTimes();
    }
  }, [selectedProfession]);
  

  const handleProfessionChange = (event) => {
    setSelectedProfession(event.target.value);
  };

  const handleBookAppointment = async () => {
    if (!selectedTime || !user?.id) {
      alert("Please select a time slot and ensure you are logged in.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/patients/appointments/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          availableTimeId: selectedTime.TimeID,
          doctorId: selectedTime.DoctorID,
          userId: user?.id,
          date: selectedTime.Date,
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


