const doctorModel = require('../models/doctorModel');
const userController= require('../controllers/patientesControler');
const availableTimesModel = require('../models/availableTimesModel'); // Adjust the path as needed
const appointmentModel = require('../models/appointmentModel');
const userModel=require('../models/userModels');
const refferalModel=require('../models/referralsModel');
const prescriptionModel = require('../models/prescriptionModel');
// Get a doctor by a specific property
async function getDoctor(req, res) {
    try {
      const propName = req.params.name;
      const propValue = req.params.value;
      const doctor = await doctorModel.findByProp(propName, propValue);
  
      if (doctor) {
        res.status(200).json(doctor);
      } else {
        res.status(404).json({ message: 'Doctor not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching doctor', error });
    }
  }

// Get all doctors
async function getAllDoctors(req, res) {
    try {
      const doctors = await doctorModel.findAll();
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching doctors', error });
    }
  }

  async function getDoctorsWithFilter(req, res) {
    try {
      const { propName, propValue } = req.params; // e.g., /doctors/filter/:propName/:propValue
      const doctors = await doctorModel.getAllWithFilter(propName, propValue);
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching doctors', error });
    }
  }

  // Update a doctor by a specific property
async function updateDoctor(req, res) {
    try {
      const propName = req.params.name;
      const propValue = req.params.value;
      const updateData = req.body;
  
      const result = await doctorModel.updateByProp(propName, propValue, updateData);
  
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Doctor updated successfully' });
      } else {
        res.status(404).json({ message: 'Doctor not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating doctor', error });
    }
  }
  
  async function deleteDoctor(req, res) {
    try {
      const propName = req.params.name;
      const propValue = req.params.value;
  
      // Find the doctor to get the associated UserID
      const doctor = await doctorModel.findByProp(propName, propValue);
  
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      // Delete the doctor record
      const doctorResult = await doctorModel.deleteByProp(propName, propValue);
      
      if (doctorResult.affectedRows === 0) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      // Delete the associated user record
      const userResult = await userController.deleteUser(req, res);
      
      if (userResult.affectedRows === 0) {
        return res.status(500).json({ message: 'Error deleting associated user' });
      }
  
      res.status(200).json({ message: 'Doctor and associated user deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting doctor', error });
    }
  }

// gets an array of doctors with the same specialty and returns there avialble times
  async function getAvailableTimes(req, res) {
    try {
      const { doctorIds } = req.body; // Expecting an array of doctor IDs in the request body
  
      if (!Array.isArray(doctorIds) || doctorIds.length === 0) {
        return res.status(400).json({ message: 'Invalid or missing doctor IDs' });
      }
  
      // Get available times for the provided doctor IDs
      const availableTimes = await availableTimesModel.getAvailableTimesByDoctorIds(doctorIds);
  
      if (availableTimes.length === 0) {
        return res.status(404).json({ message: 'No available times found for the specified doctors' });
      }
  
      res.status(200).json(availableTimes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching available times', error });
    }
  }
 // returns a list with all specialties that the company has
  async function getSpecialties(req, res) {
    try {
      const specialties = await DoctorModel.getSpecialties();
      res.status(200).json(specialties);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching specialties', error });
    }
  }
  
  async function getAppointmentsByDoctorId(req, res) {
    try {
      const doctorId = req.params.id;
  
      // Check if the doctor exists
      const doctor = await doctorModel.findByProp('DoctorID', doctorId);
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }
  
      // Fetch all appointments for the doctor
      const appointments = await appointmentModel.getAllWithFilter('DoctorID', doctorId);
  
      if (appointments.length > 0) {
        res.status(200).json(appointments);
      } else {
        res.status(404).json({ message: 'No appointments found for this doctor' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching appointments', error });
    }
  }

  async function getPatientByUserId(req, res) {
    try {
      const { userId } = req.params;
  
      // Validate the input
      if (!userId) {
        return res.status(400).json({ message: 'User ID must be provided' });
      }
  
      // Fetch patient information by User ID
      const patient = await userModel.findByProp('UserID', userId);
  
      if (patient) {
        res.status(200).json(patient);
      } else {
        res.status(404).json({ message: 'Patient not found for the provided User ID' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching patient information', error });
    }
  }

 async function creatAReffral(req,res){
  try{
  const { patientID, doctorID, testName, date, location, notes } = req.body;

  // Validate input
  if (!patientID || !doctorID || !testName || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const refferalData = {
    PatientID: patientID,
    DoctorID: doctorID,
    TestName:testName,
    Date: date,
    Location: location,
    Notes: notes,
  };

  const result = await refferalModel.create(refferalData);

  res.status(201).json({ message: 'Appointment booked successfully', appointmentId: result.insertId });
} catch (error) {
  res.status(500).json({ message: 'Error booking appointment', error });
}
 }

 async function createPrescription(req, res) {
  try {
    const { patientID, doctorID, medicineID, expirationDate, creationDate } = req.body;

    // Validate input
    if (!patientID || !doctorID || !medicineID || !expirationDate || !creationDate) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const prescriptionData = {
      PatientID: patientID,
      DoctorID: doctorID,
      MedicineID: medicineID,
      ExpirationDate: expirationDate,
      CreationDate: creationDate,
    };

    const result = await prescriptionModel.create(prescriptionData);

    res.status(201).json({ message: 'Prescription created successfully', prescriptionId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating prescription', error });
  }
}
module.exports = {
    getDoctor,
    getAllDoctors,
    deleteDoctor,
    updateDoctor,
    getDoctorsWithFilter,
    getSpecialties,
    getAppointmentsByDoctorId,
    getAvailableTimes,
    getPatientByUserId,
    creatAReffral,
    createPrescription,
  };