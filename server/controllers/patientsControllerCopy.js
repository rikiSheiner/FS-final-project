const userModel = require("../models/userModel");
const refferalModel = require("../models/refferalsModel");
const prescriptionModel = require("../models/prescriptionsModel");
const prescriptionReqModel = require("../models/prescriptionRequestModel");
const newCardReqModel = require("../models/newCardRequestModel");

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

async function deleteUser(req, res) {
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

// פונקציה עבור ביצוע התחברות של משתמש
// הפרטים הדרושים עבור התחברות המשתמש הם אימייל וסיסמה
// יש לוודא שהם נכונים כדי לאפשר למשתמש להתחבר
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // חיפוש בבסיס הנתונים של משתמש עם מייל זה
    const user = await userModel.getUserByEmail(email);

    // בדיקה האם מצאנו משתמש עם אימייל זה
    if (!user) {
      // אם לא מצאנו משתמש מתאים יש בעיה ונחזיר קוד שגיאה
      return res.status(404).json({ message: "User not found" });
    }

    // השוואה בין הסיסמה של המשתמש הקיים במערכת לבין הסיסמה שהתקבלה
    if (password !== user.password) {
      // סיסמה שגויה נחזיר שגיאה
      return res.status(401).json({ message: "Wrong password" });
    }

    // ההתחברות בוצעה בהצלחה
    // נחזיר פרטים בסיסיים של המשתמש
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
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
    res.status(201).json(result);
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
    res
      .status(500)
      .json({
        message: "Error retreiving incompleted prescription request",
        error,
      });
  }
}

async function createNewCardRequest(req, res) {
  try {
    const newCardReq = req.body;
    const result = await newCardReqModel.create(newCardReq);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating new card request", error });
  }
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  loginUser,
  getPatientRefferals,
  getPatientPrescriptions,
  createPrescriptionRequest,
  createNewCardRequest,
  getPrescriptionRequestOfPatient,
  getIncompletedPrescriptionReqtOfPatient,
};
