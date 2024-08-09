// src/controllers/userController.js
const userModel = require('../models/userModel');
const DoctorControler = require('../controllers/DoctorControler');
//base funcs
async function createUser(req, res) {
  try {
    const newUser = req.body;
    const result = await userModel.createUser(newUser);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
}

async function getUser(req, res) {
  try {
    const propName= req.params.name;
    const propValue= req.params.value;
    const user = await userModel.findByProp(propName,propValue);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
}

async function getPatientsWithFilter(req, res) {
    try {
      const { propName, propValue } = req.params; // e.g., /patients/filter/:propName/:propValue
      const patients = await patientModel.getAllWithFilter(propName, propValue);
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching patients', error });
    }
  }

async function deleteUser(req, res) {
    try {
      const propName = req.params.name;
      const propValue = req.params.value;
      const result = await userModel.deleteByProp(propName, propValue);
  
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  }

  async function updateUser(req, res) {
    try {
      const propName = req.params.name;
      const propValue = req.params.value;
      const updateData = req.body;
  
      const result = await userModel.updateByProp(propName, propValue, updateData);
  
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'User updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  }
  
async function signIn(req, res) {
    try {
      const { firstName, lastName, password, birthDate, phone, email, roleID } = req.body;
  
      //  Validate input
      if (!firstName || !lastName || !password || !phone || !email) {
        return res.status(400).json({ message: 'All required fields must be filled' });
      }
  
      // Check if a user already exists with the same email
      let user = await userModel.findByProp('Email', email);
      if (user) {
        return res.status(409).json({ message: 'User with this email already exists' });
      }
  
      // Check if a user already exists with the same phone
      user = await userModel.findByProp('Phone', phone);
      if (user) {
        return res.status(409).json({ message: 'User with this phone number already exists' });
      }
  
      // Check if a user already exists with the same password
      user = await userModel.findByProp('Password', password);
      if (user) {
        return res.status(409).json({ message: 'User with this password already exists' });
      }
  
      // Password length validation
      if (password.length < 8 || password.length > 10) {
        return res.status(400).json({ message: 'Password must be between 8 and 10 characters' });
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
      res.status(500).json({ message: 'Error creating user', error });
    }
  }

  async function getAvailableAppointments(req, res) {
    try {
      const { specialty } = req.params; // e.g., /appointments/available/:specialty
  
      // Get doctors with the specified specialty
      const doctors = await doctorModel.getAllWithFilter('Profession', specialty);
  
      if (doctors.length === 0) {
        return res.status(404).json({ message: 'No doctors found with the specified specialty' });
      }
  
      // Extract doctor IDs
      const doctorIds = doctors.map(doctor => doctor.DoctorID);
  
      // Get available times for the retrieved doctors
      const [availableTimes] = await DoctorControler.getAvailableTimesByDoctorIds(doctorIds); // צריך ליצור פה את הפונקציה במודל 
  
      // Sort available times by date and time
      const sortedAvailableTimes = availableTimes.sort((a, b) => {
        const dateTimeA = new Date(`${a.Date} ${a.StartTime}`);
        const dateTimeB = new Date(`${b.Date} ${b.StartTime}`);
        return dateTimeA - dateTimeB;
      });
  
      res.status(200).json(sortedAvailableTimes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching available appointments', error });
    }
  }
  



module.exports = {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
  signIn,
  getPatientsWithFilter,
  getAvailableAppointments,
};