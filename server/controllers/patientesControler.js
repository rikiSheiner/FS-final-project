import userModel from "../models/userModel.js";
import DoctorControler from "../controllers/doctorController.js";
import appointmentModel from "../models/appointmentModel.js";
import availableTimesModel from "../models/availableTimesModel.js";
import medicineModel from "../models/medicineModel.js";
import medicineOrderModel from "../models/medicineOrderModel.js";
import accountDetailsModel from "../models/accountDetailsModel.js";


async function createUser(req, res) {
  try {
    const newUser = req.body;
    const result = await userModel.create(newUser);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
}

async function getUser(req, res) {
  try {
    const userID = req.params.id;
    const user = await userModel.findByProp("userId", userID);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userModel.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
}

/*async function deleteUser(req, res) {
  try {
    const userID = req.params.id;
    const result = await userModel.deleteUserById(userID);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
}
*/
async function getPatientsWithFilter(req, res) {
  try {
    const { propName, propValue } = req.params;
    const patients = await patientModel.getAllWithFilter(propName, propValue);
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error });
  }
}

async function deleteUser(req, res) {
  try {
    const propName = req.params.name;
    const propValue = req.params.value;
    const result = await userModel.deleteByProp(propName, propValue);

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
}

async function updateUser(req, res) {
  try {
    const propName = req.params.name;
    const propValue = req.params.value;
    const updateData = req.body;

    const result = await userModel.updateByProp(
      propName,
      propValue,
      updateData
    );

    if (result.affectedRows > 0) {
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
}

async function signIn(req, res) {
  try {
    const { firstName, lastName, password, birthDate, phone, email, roleID } =
      req.body;

    //  Validate input
    if (!firstName || !lastName || !password || !phone || !email) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    // Check if a user already exists with the same email
    let user = await userModel.findByProp("Email", email);
    if (user) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    // Check if a user already exists with the same phone
    user = await userModel.findByProp("Phone", phone);
    if (user) {
      return res
        .status(409)
        .json({ message: "User with this phone number already exists" });
    }

    // Check if a user already exists with the same password
    user = await userModel.findByProp("Password", password);
    if (user) {
      return res
        .status(409)
        .json({ message: "User with this password already exists" });
    }

    // Password length validation
    if (password.length < 8 || password.length > 10) {
      return res
        .status(400)
        .json({ message: "Password must be between 8 and 10 characters" });
    }

    //  Create new user
    const newUser = {
      firstName,
      lastName,
      password,
      birthDate,
      phone,
      email,
      roleID: roleID || null,
    };

    const createdUser = await userModel.createUser(newUser);

    // Respond with the created user data
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
}

async function getAvailableAppointments(req, res) {
  try {
    const { specialty } = req.params; // e.g., /appointments/available/:specialty

    // Get doctors with the specified specialty
    const doctors = await doctorModel.getAllWithFilter("Profession", specialty);

    if (doctors.length === 0) {
      return res
        .status(404)
        .json({ message: "No doctors found with the specified specialty" });
    }

    // Extract doctor IDs
    const doctorIds = doctors.map((doctor) => doctor.DoctorID);

    // Get available times for the retrieved doctors
    const [availableTimes] = await DoctorControler.getAvailableTimesByDoctorIds(
      doctorIds
    );

    // Sort available times by date and time
    const sortedAvailableTimes = availableTimes.sort((a, b) => {
      const dateTimeA = new Date(`${a.Date} ${a.StartTime}`);
      const dateTimeB = new Date(`${b.Date} ${b.StartTime}`);
      return dateTimeA - dateTimeB;
    });

    res.status(200).json(sortedAvailableTimes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching available appointments", error });
  }
}

// פונקציה עבור ביצוע התחברות של משתמש
// הפרטים הדרושים עבור התחברות המשתמש הם אימייל וסיסמה
// יש לוודא שהם נכונים כדי לאפשר למשתמש להתחבר

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await userModel.getUserByEmail(email);

    if (!user || !user.Password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Directly compare plain text passwords
    if (password !== user.Password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.UserID,
        email: user.Email,
        firstName: user.FirstName,
        lastName: user.LastName,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
}




async function getPatientRefferals(req, res) {
  try {
    const userID = req.body.user.userId;

    const refferals = await refferalModel.getPatientRefferals(userID);

    if (!refferals) {
      return res
        .status(404)
        .json({ message: "Refferals for patient not found" });
    }

    res.status(200).json(refferals);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retreiving patient's refferals", error });
  }
}

async function getPatientPrescriptions(req, res) {
  try {
    const userID = req.body.user.userId;

    const prescriptions = await prescriptionModel.getPatientPrescriptions(
      userID
    );

    if (!prescriptions) {
      return res
        .status(404)
        .json({ message: "Prescriptions for patient not found" });
    }

    res.status(200).json(prescriptions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retreiving patient's prescriptions", error });
  }
}

async function createPrescriptionRequest(req, res) {
  try {
    const newPrescriptionReq = req.body;
    const result = await prescriptionReqModel.create(newPrescriptionReq);
    res.status(201).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating prescription request", error });
  }
}

async function getPrescriptionRequestOfPatient(req, res) {
  try {
    const patientID = req.body.userId;
    const result = await prescriptionReqModel.getPRofPatient(patientID);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retreiving prescription requests", error });
  }
}

async function getIncompletedPrescriptionReqtOfPatient(req, res) {
  try {
    const patientID = req.body.userId;
    const result = await prescriptionReqModel.getIncompletedPRofPatient(
      patientID
    );
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error retreiving incompleted prescription request",
      error,
    });
  }
}

async function createNewCardRequest(req, res) {
  try {
    const { patientId } = req.body; 
    if (!patientId) {
      return res.status(400).json({ message: "patientId is required" });
    }
    
    const newCardReq = {
      patientId: patientId,
      completed: false, 
      createdAt: new Date()
    };

    const result = await newCardReqModel.create(newCardReq);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating new card request", error });
  }
}


// Controller method to book an appointment using the base model's create function
async function bookAppointment(req, res) {
  try {
    const { availableTimeId, doctorId, userId, date, startTime, endTime } =
      req.body;

    // Validate the input
    if (!doctorId || !userId || !date || !startTime || !endTime) {
      return res
        .status(400)
        .json({ message: "All appointment details must be provided" });
    }

    // Prepare appointment data
    const appointmentData = {
      DoctorID: doctorId,
      UserID: userId,
      Date: date,
      StartTime: startTime,
      EndTime: endTime,
    };

    // Book the appointment using the create method from the base model
    const result = await appointmentModel.create(appointmentData);

    if (result.AppointmentID) {
      // Delete the corresponding time slot from available times
      const deleteResult = await availableTimesModel.deleteByProp(
        "AvailableTimeID",
        availableTimeId
      );

      if (deleteResult.affectedRows === 0) {
        throw new Error("Failed to remove the time slot from available times");
      }
    }

    res.status(201).json({
      message: "Appointment booked successfully",
      appointmentId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error });
  }
}

async function searchMedicineByName(req, res) {
  try {
    const { name } = req.params;
    const result = await medicineModel.getMedicineByName(name);

    if (result && result.length > 0) {
      res
        .status(200)
        .json({ message: "The medicine was found", medicine: result });
    } else {
      res.status(404).json({ message: "No medicine found with that name" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error searching for medicine", error });
  }
}

async function getAllMedicines(req, res) {
  try {
    const medicines = await medicineModel.findAll();

    if (medicines && medicines.length > 0) {
      res.status(200).json(medicines);
    } else {
      res.status(404).json({ message: "No medicines found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving medicines", error });
  }
}

async function getAllMedicinesWithPrescription(req, res) {
  try {
    const medicines = await medicineModel.getMedicinesByPrescriptionStatus(true);

    if (medicines && medicines.length > 0) {
      res.status(200).json(medicines);
    } else {
      res.status(404).json({ message: "No medicines with prescription found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving medicines with prescription", error });
  }
}

async function getAllMedicinesWithoutPrescription(req, res) {
  try {
    const medicines = await medicineModel.getMedicinesByPrescriptionStatus(false);

    if (medicines && medicines.length > 0) {
      res.status(200).json(medicines);
    } else {
      res.status(404).json({ message: "No medicines without prescription found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving medicines without prescription", error });
  }
}

async function orderMedicine(req, res) {
  try {
    const orderDetails = req.body;

    const accountDetails = accountDetailsModel.findByProp(
      "userId",
      orderDetails.patientID
    );

    if(!accountDetails){
      return res.status(404).json({ message: 'Account details not found'});
    }

    if (!orderDetails.medicineId || !orderDetails.quantity) {
      return res
        .status(400)
        .json({ message: "Medicine ID and quantity are required" });
    }

    const result = await medicineOrderModel.create(orderDetails);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error ordering medicine", error });
  }
}

export default{
createUser,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
  signIn,
  getPatientsWithFilter,
  getAvailableAppointments,
  loginUser,
  getPatientRefferals,
  getPatientPrescriptions,
  createPrescriptionRequest,
  createNewCardRequest,
  getPrescriptionRequestOfPatient,
  getIncompletedPrescriptionReqtOfPatient,
  bookAppointment,
  searchMedicineByName,
  getAllMedicines,
  getAllMedicinesWithPrescription,
  getAllMedicinesWithoutPrescription,
  orderMedicine,
};
