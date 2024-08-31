import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentModel.js";
import availableTimesModel from "../models/availableTimesModel.js";
import medicineModel from "../models/medicineModel.js";
import medicineOrderModel from "../models/medicineOrderModel.js";
import accountDetailsModel from "../models/accountDetailsModel.js";
import addressModel from "../models/addressModel.js";
import orderItemsModel from "../models/orderItemsModel.js";
import doctorModel from "../models/doctorModel.js";
import newCardReqModel from "../models/newCardRequestModel.js";
import prescriptionModel from "../models/prescriptionModel.js";
import refferalModel from "../models/referralsModel.js";
import prescriptionReqModel from "../models/prescriptionRequestModel.js";
import PatientDoctorModel from "../models/PatientDoctorModel.js";

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
    console.log("Request Body:", req.body); // Log the request body

    const { firstName, lastName, password, birthDate, phone, email, roleID } =
      req.body;

    // Validate input
    if (!firstName || !lastName || !password || !phone || !email) {
      console.error("Validation Error: Missing required fields");
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    // Check if a user already exists with the same email
    let user = await userModel.findByProp("email", email);
    if (user) {
      console.error("Validation Error: User with this email already exists");
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    // Check if a user already exists with the same phone
    user = await userModel.findByProp("phone", phone);
    if (user) {
      console.error(
        "Validation Error: User with this phone number already exists"
      );
      return res
        .status(409)
        .json({ message: "User with this phone number already exists" });
    }

    // Check if a user already exists with the same password
    user = await userModel.findByProp("password", password);
    if (user) {
      console.error("Validation Error: User with this password already exists");
      return res
        .status(409)
        .json({ message: "User with this password already exists" });
    }

    // Password length validation
    if (password.length < 8 || password.length > 10) {
      console.error("Validation Error: Password length invalid");
      return res
        .status(400)
        .json({ message: "Password must be between 8 and 10 characters" });
    }

    // Create new user
    const newUser = {
      firstName,
      lastName,
      password,
      birthDate,
      phone,
      email,
      roleID: roleID || null,
    };

    console.log("Creating new user:", newUser); // Log the user being created
    const createdUser = await userModel.create(newUser);

    // Respond with the created user data
    console.log("User created successfully:", createdUser); // Log successful creation
    res.status(201).json(createdUser);
  } catch (error) {
    console.error("Error during sign-in:", error); // Log the actual error message
    res
      .status(500)
      .json({
        message: "Error creating user",
        error: error.message || "An unknown error occurred",
      });
  }
}

async function getAvailableAppointments(req, res) {
  try {
    const { doctorId } = req.body;
    console.log("doctorId received:", doctorId); // Confirm doctor ID is received

    const availableTimes =
      await availableTimesModel.getAvailableTimesByDoctorIds([doctorId]);
    console.log("Available times retrieved:", availableTimes); // Log the retrieved times

    if (!availableTimes || availableTimes.length === 0) {
      return res
        .status(404)
        .json({ message: "No available times found for the specified doctor" });
    }

    // Sort and return available times
    const sortedAvailableTimes = availableTimes.sort((a, b) => {
      const dateTimeA = new Date(`${a.Date} ${a.StartTime}`);
      const dateTimeB = new Date(`${b.Date} ${b.StartTime}`);
      return dateTimeA - dateTimeB;
    });

    res.status(200).json(sortedAvailableTimes);
  } catch (error) {
    console.error("Error fetching available appointments:", error);
    res
      .status(500)
      .json({ message: "Error fetching available appointments", error });
  }
}

async function getProfession(req, res) {
  try {
    const Profession = await doctorModel.getSpecialties();
    res.status(200).json(Profession);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching professions", error: error.message });
  }
}
// פונקציה עבור ביצוע התחברות של משתמש
// הפרטים הדרושים עבור התחברות המשתמש הם אימייל וסיסמה
// יש לוודא שהם נכונים כדי לאפשר למשתמש להתחבר
/*async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    console.log(email, password);
    const users = await userModel.getUserByEmail(email);

    if (!users) {
      console.log(users);
      console.log("User not found or password missing");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];
    // Directly compare plain text passwords
    if (password !== user.Password) {
      console.log(
        `Password mismatch: provided=${password}, stored=${user.Password}`
      );
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
    console.error("Error during sign-in:", error);
    res
      .status(500)
      .json({
        message: "Error during login",
        error: error.message || "An unknown error occurred",
      });
  }
}
*/

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
        phone: user.Phone,
      },
    });
  } catch (error) {
  
      console.error('Error during sign-in:', error);
      res.status(500).json({ message: "Error creating user", error: error.message || 'An unknown error occurred' });

  }
}

async function getPatientRefferals(req, res) {
  try {
    const userID = Number(req.query.userID); // חילוץ ה-ID מה-Query String

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
  const userID = Number(req.query.userID); // חילוץ ה-ID מה-Query String

  console.log("UserID received from query:", userID);

  if (!userID) {
    return res.status(400).json({ message: "UserID is required" });
  }

  try {
    const prescriptions = await prescriptionModel.getPatientPrescriptions(
      userID
    );

    console.log("PatientPrescriptions", prescriptions);

    if (!prescriptions || prescriptions.length === 0) {
      return res
        .status(404)
        .json({ message: "Prescriptions for patient not found" });
    }

    res.status(200).json(prescriptions);
  } catch (error) {
    console.error("Error retrieving patient's prescriptions:", error);
    res
      .status(500)
      .json({
        message: "Error retrieving patient's prescriptions",
        error: error.message,
      });
  }
}

async function createPrescriptionRequest(req, res) {
  try {
    const newPrescriptionReq = req.body;

    console.log(newPrescriptionReq);

    const patientDoctorRelation = await PatientDoctorModel.findByProp('PatientID', newPrescriptionReq.PatientID);

    if (!patientDoctorRelation) {
      return res.status(404).json({ message: "Doctor not found for the given patient" });
    }

    newPrescriptionReq.DoctorID = patientDoctorRelation.DoctorID;

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
      createdAt: new Date(),
    };

    const result = await newCardReqModel.create(newCardReq);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating new card request:", error);
    res.status(500).json({ message: "Error creating new card request" });
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
    const medicines = await medicineModel.getMedicinesByPrescriptionStatus(
      true
    );

    if (medicines && medicines.length > 0) {
      res.status(200).json(medicines);
    } else {
      res.status(404).json({ message: "No medicines with prescription found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving medicines with prescription", error });
  }
}

async function getAllMedicinesWithoutPrescription(req, res) {
  try {
    const medicines = await medicineModel.getMedicinesByPrescriptionStatus(
      false
    );

    if (medicines && medicines.length > 0) {
      res.status(200).json(medicines);
    } else {
      res
        .status(404)
        .json({ message: "No medicines without prescription found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving medicines without prescription",
      error,
    });
  }
}

/*
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
}*/

async function orderMedicine(req, res) {
  try {
    console.log("Request body:", req.body);

    const { addressDetails, accountDetails, orderDetails } = req.body;

    // בדיקת תקינות addressDetails
    if (addressDetails) {
      console.log("Address details received:", addressDetails);

      if (addressDetails.isDefault) {
        await addressModel.updateByProp("UserID", orderDetails.patientID, {
          IsDefault: false,
        });
      }
      const newAddress = await addressModel.create({
        UserID: orderDetails.patientID,
        ApartmentNumber: addressDetails.apartmentNumber,
        BuildingNumber: addressDetails.buildingNumber,
        Street: addressDetails.street,
        City: addressDetails.city,
        IsDefault: addressDetails.isDefault || false,
      });
      orderDetails.addressID = newAddress.insertId;
      console.log("New address created with ID:", orderDetails.addressID);
    }

    // בדיקת תקינות accountDetails
    if (accountDetails) {
      console.log("Account details received:", accountDetails);

      if (accountDetails.isDefault) {
        await accountDetailsModel.updateByProp(
          "UserID",
          orderDetails.patientID,
          { IsDefault: false }
        );
      }
      const newAccountDetails = await accountDetailsModel.create({
        UserID: orderDetails.patientID,
        CardNumber: accountDetails.cardNumber,
        ExpirationDate: accountDetails.expirationDate,
        CVV: accountDetails.cvv,
        IsDefault: accountDetails.isDefault || false,
      });
      orderDetails.accountID = newAccountDetails.insertId;
      console.log(
        "New account details created with ID:",
        orderDetails.accountID
      );
    }

    // יצירת ההזמנה בטבלת medicineorders
    const orderResult = await medicineOrderModel.create({
      PatientID: orderDetails.patientID,
      TotalPrice: orderDetails.totalPrice,
      AddressID: orderDetails.addressID,
      AccountID: orderDetails.accountID,
      Completed: true,
      CreationDate: new Date(),
    });

    const orderID = orderResult.insertId; // שמירת מזהה ההזמנה שנוצר
    console.log("New order created with ID:", orderID);

    // הוספת כל פריט לטבלת order_items
    for (let item of orderDetails.items) {
      console.log("Adding item to order:", item);
      await orderItemsModel.create({
        OrderID: orderID,
        MedicineID: item.medicineID,
        Quantity: item.amount,
        UnitPrice: item.price,
      });
    }

    res
      .status(201)
      .json({ message: "Order created successfully", orderID: orderID });
  } catch (error) {
    console.error("Error in orderMedicine:", error); // הדפסת השגיאה ללוגים
    res.status(500).json({ message: "Error ordering medicine", error });
  }
}

// פונקציה לקבלת כל הכתובות ששמורות עבור משתמש מסוים
async function getAllAddresses(req, res) {
  try {
    const userId = req.params.userId;
    console.log(`Received userId: ${userId}`); // בדוק שה-ID מגיע

    const addresses = await addressModel.getAllWithFilter("UserID", userId);
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving addresses", error });
  }
}

// פונקציה לקבלת כל פרטי החשבונות השמורים עבור משתמש מסוים
async function getAllAccountDetails(req, res) {
  try {
    const userId = req.params.userId;
    const accountDetails = await accountDetailsModel.getAllWithFilter(
      "UserID",
      userId
    );
    res.status(200).json(accountDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving account details", error });
  }
}

/*
async function getProfession(req, res) {
  try {
    const doctors = await doctorModel.getSpecialties();

    if (doctors && doctors.length > 0) {
      res.status(200).json(doctors);
    } else {
      res.status(404).json({ message: "No doctors found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving doctors", error });
  }
}
*/

async function getAllAppointments(req, res) {
  const { id } = req.body;
  console.log("Received User ID:", id);

  try {
    const appointments = await appointmentModel.getAllWithFilter("UserID", id);
    console.log("Fetched Appointments:", appointments);
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Error fetching appointments", error });
  }
}

async function connectDoctor(req, res) {
  try {
    const { userId, doctorId } = req.body;

    // Ensure both userId and doctorId are provided
    if (!userId || !doctorId) {
      return res
        .status(400)
        .json({ message: "User ID and Doctor ID are required." });
    }

    // Create a new entry in the PatientDoctor table
    const result = await PatientDoctorModel.create({
      PatientID: userId,
      DoctorID: doctorId,
    });

    res
      .status(201)
      .json({ message: "Doctor successfully assigned to patient.", result });
  } catch (error) {
    console.error("Error connecting doctor:", error);
    res
      .status(500)
      .json({ message: "Failed to assign doctor.", error: error.message });
  }
}

export default {
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
  getAllAddresses,
  getAllAccountDetails,
  getProfession,
  getAllAppointments,
  connectDoctor,
};
