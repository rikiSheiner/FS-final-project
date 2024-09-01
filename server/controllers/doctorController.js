import doctorModel from "../models/doctorModel.js";
import userController from "../controllers/patientesControler.js";
import availableTimesModel from "../models/availableTimesModel.js";
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";
import refferalModel from "../models/referralsModel.js";
import prescriptionRequestModel from "../models/prescriptionRequestModel.js";
import medicineModel from "../models/medicineModel.js";
import patientDoctorModel from "../models/PatientDoctorModel.js";
import prescriptionModel from "../models/prescriptionModel.js";

async function getDoctor(req, res) {
  try {
    const { propName, propValue } = req.body;
    const doctor = await doctorModel.findByProp(propName, propValue);

    if (doctor) {
      res.status(200).json(doctor);
    } else {
      res.status(404).json({ message: "Doctor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error });
  }
}

async function getAllDoctors(req, res) {
  try {
    const doctors = await doctorModel.findAll();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
}


async function getDoctorsWithFilter(req, res) {
  try {
      const { propName, propValue } = req.query; 
      const doctors = await doctorModel.getDoctorsWithClinicDetails(propName, propValue);
      res.status(200).json(doctors);
  } catch (error) {
      res.status(500).json({ message: "Error fetching doctors", error });
  }
}


async function updateDoctor(req, res) {
  try {
    const propName = req.params.name;
    const propValue = req.params.value;
    const updateData = req.body;

    const result = await doctorModel.updateByProp(
      propName,
      propValue,
      updateData
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Doctor updated successfully" });
    } else {
      res.status(404).json({ message: "Doctor not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor", error });
  }
}

async function deleteDoctor(req, res) {
  try {
    const propName = req.params.name;
    const propValue = req.params.value;

    const doctor = await doctorModel.findByProp(propName, propValue);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const doctorResult = await doctorModel.deleteByProp(propName, propValue);

    if (doctorResult.affectedRows === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const userResult = await userController.deleteUser(req, res);

    if (userResult.affectedRows === 0) {
      return res
        .status(500)
        .json({ message: "Error deleting associated user" });
    }

    res
      .status(200)
      .json({ message: "Doctor and associated user deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting doctor", error });
  }
}

async function getAvailableTimes(req, res) {
  try {
    const { doctorIds } = req.body; 

    if (!Array.isArray(doctorIds) || doctorIds.length === 0) {
      return res.status(400).json({ message: "Invalid or missing doctor IDs" });
    }

    const availableTimes =
      await availableTimesModel.getAvailableTimesByDoctorIds(doctorIds);

    if (availableTimes.length === 0) {
      return res.status(404).json({
        message: "No available times found for the specified doctors",
      });
    }

    res.status(200).json(availableTimes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching available times", error });
  }
}
// returns a list with all specialties that the company has
async function getSpecialties(req, res) {
  try {
    const specialties = await DoctorModel.getSpecialties();
    res.status(200).json(specialties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching specialties", error });
  }
}

async function getAppointmentsByDoctorId(req, res) {
  try {
    const doctorId = req.params.id;

    // Check if the doctor exists
    const doctor = await doctorModel.findByProp("DoctorID", doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Fetch all appointments for the doctor
    const appointments = await appointmentModel.getAllWithFilter(
      "DoctorID",
      doctorId
    );

    if (appointments.length > 0) {
      res.status(200).json(appointments);
    } else {
      res
        .status(404)
        .json({ message: "No appointments found for this doctor" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
}

async function getAppointmentsByDoctorIdWithQuery(req, res) {
  try {
    const doctorId = req.query.doctorId;

    if (!doctorId) {
      return res
        .status(400)
        .json({ message: "Missing doctorId query parameter" });
    }

    const doctor = await doctorModel.findByProp("DoctorID", doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointments =
      await appointmentModel.getAppointmentsWithPatientDetails(doctorId);

    if (appointments.length > 0) {
      res.status(200).json(appointments);
    } else {
      res
        .status(404)
        .json({ message: "No appointments found for this doctor" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
}

async function getPatientByUserId(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID must be provided" });
    }

    // Fetch patient information by User ID
    const patient = await userModel.findByProp("UserID", userId);

    if (patient) {
      res.status(200).json(patient);
    } else {
      res
        .status(404)
        .json({ message: "Patient not found for the provided User ID" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching patient information", error });
  }
}

async function creataReffral(req, res) {
  try {
    const { patientID, doctorID, testName, date, location, notes } = req.body;

    // Validate input
    if (!patientID || !doctorID || !testName || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const refferalData = {
      PatientID: patientID,
      DoctorID: doctorID,
      TestName: testName,
      Date: date,
      Location: location,
      Notes: notes,
    };

    const result = await refferalModel.create(refferalData);

    res.status(201).json({
      message: "Appointment booked successfully",
      appointmentId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
}


async function createPrescription(req, res) {
  try {
    const { patientID, doctorID, medicineID, expirationDate, creationDate } =
      req.body;

    // Validate input
    if (
      !patientID ||
      !doctorID ||
      !medicineID ||
      !expirationDate ||
      !creationDate
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const prescriptionData = {
      PatientID: patientID,
      DoctorID: doctorID,
      MedicineID: medicineID,
      ExpirationDate: expirationDate,
      CreationDate: creationDate,
    };

    // Create the prescription
    const result = await prescriptionModel.create(prescriptionData);

    res.status(201).json({
      message: "Prescription created successfully",
      prescriptionId: result.insertId,
    });
  } catch (error) {
    console.error("Error creating prescription:", error);
    res.status(500).json({ message: "Error creating prescription", error });
  }
}

// פונקציה שמחזירה את כל המטופלים של רופא מסוים
async function getPatientsByDoctorID(req, res) {
  try {
    const doctorID = req.query.doctorID;

    if (!doctorID) {
      return res.status(400).json({ message: "DoctorID is required" });
    }

    const patientDetails = await patientDoctorModel.getPatientsOfDoctor(
      doctorID
    );

    if (!patientDetails || patientDetails.length === 0) {
      return res
        .status(404)
        .json({ message: "No patients found for the given doctor ID" });
    }

    res.status(200).json(patientDetails);
  } catch (error) {
    console.error("Error fetching patients by doctor ID:", error);
    res.status(500).json({
      message: "Could not fetch patients for the given doctor ID",
      error,
    });
  }
}

async function getUnapprovedPrescriptionRequests(req, res) {
  try {
    const doctorID = req.query.doctorID;
    const patientID = req.query.patientID;

    if (!doctorID || !patientID) {
      return res
        .status(400)
        .json({ message: "DoctorID and PatientID are required" });
    }

    console.log("DoctorID:", doctorID);
    console.log("PatientID:", patientID);

    const prescriptionRequests =
      await prescriptionRequestModel.getRequestsWithMedicineDetails({
        DoctorID: doctorID,
        PatientID: patientID,
        Approved: false,
      });

    console.log("Prescription Requests:", prescriptionRequests);

    if (!prescriptionRequests || prescriptionRequests.length === 0) {
      return res.status(404).json({
        message:
          "No unapproved prescription requests found for the given patient and doctor",
      });
    }

    res.status(200).json(prescriptionRequests);
  } catch (error) {
    console.error("Error retrieving unapproved prescription requests:", error);
    res.status(500).json({
      message: "Error retrieving unapproved prescription requests",
      error: error.message,
    });
  }
}

async function getPatientPrescriptionRequests(req, res) {
  try {
    const doctorID = req.query.doctorID;
    const patientID = req.query.patientID;

    if (!doctorID || !patientID) {
      return res
        .status(400)
        .json({ message: "DoctorID and PatientID are required" });
    }

    const prescriptionRequests =
      await prescriptionRequestModel.getAllWithMultipleFilters({
        DoctorID: doctorID,
        PatientID: patientID,
      });

    if (!prescriptionRequests || prescriptionRequests.length === 0) {
      return res.status(404).json({
        message:
          "No prescription requests found for the given patient and doctor",
      });
    }

    res.status(200).json(prescriptionRequests);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving patient's prescription requests",
      error,
    });
  }
}

async function getPrescriptions(req, res) {
  try {
    const { id } = req.query; 

    const prescriptions = await prescriptionRequestModel.getPrescriptionsWithDetails(id);

    if (!prescriptions || prescriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "No prescriptions found for this doctor" });
    }

    res.status(200).json(prescriptions);
  } catch (error) {
    console.error('Error retrieving prescriptions:', error);
    res.status(500).json({ message: "Error retrieving prescriptions", error });
  }
}


async function getMedName(req, res) {
  try {
    const { MedicineID } = req.body;

    const med = await medicineModel.findByProp("MedicineID", MedicineID);

    if (!med) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    res.status(200).json({ Name: med.Name }); 
  } catch (error) {
    res.status(500).json({ message: "Error retrieving medicine name", error });
  }
}

async function alterApprove(req, res) {
  try {
    const { requestID } = req.body; 

    if (!requestID) {
      return res.status(400).json({ error: "Request ID is required" });
    }

    const result = await prescriptionRequestModel.updateByProp(
      "RequestID", 
      requestID, 
      { Approved: true } 
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Prescription request not found" });
    }

    res
      .status(200)
      .json({ message: "Prescription request approved successfully" });
  } catch (error) {
    console.error("Error updating prescription status:", error); 
    res
      .status(500)
      .json({ message: "Error updating prescription status", error });
  }
}

async function getStatistics(req, res) {
  try {
    const doctorId = req.query.doctorId;

    if (!doctorId) {
      return res
        .status(400)
        .json({ message: "Missing doctorId query parameter" });
    }

    const appointmentsToday = await appointmentModel.countAppointmentsToday(
      doctorId
    );
    const unapprovedPrescriptions =
      await prescriptionRequestModel.countUnapprovedPrescriptions(doctorId);
    const patientCount = await patientDoctorModel.countPatients(doctorId);

    res.status(200).json({
      appointmentsToday,
      unapprovedPrescriptions,
      patientCount,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Error fetching statistics", error });
  }
}

async function getFutureAppointments(req, res) {
  try {
    const doctorId = req.query.doctorId;

    if (!doctorId) {
      return res.status(400).json({ message: 'Missing doctorId query parameter' });
    }

    const appointments = await appointmentModel.getFutureAppointmentsModel(doctorId);

    if (appointments.length > 0) {
      res.status(200).json(appointments);
    } else {
      res.status(404).json({ message: 'No future appointments found for this doctor' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error });
  }
}


export default {
  getDoctor,
  getAllDoctors,
  deleteDoctor,
  updateDoctor,
  getDoctorsWithFilter,
  getSpecialties,
  getAppointmentsByDoctorId,
  getAvailableTimes,
  getPatientByUserId,
  creataReffral,
  createPrescription,
  getAppointmentsByDoctorIdWithQuery,
  getPrescriptions,
  getMedName,
  alterApprove,
  getPatientsByDoctorID,
  getPatientPrescriptionRequests,
  getUnapprovedPrescriptionRequests,
  getStatistics,
  getFutureAppointments,
};
