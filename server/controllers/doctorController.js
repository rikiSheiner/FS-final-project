const userModel = require('../models/userModel');

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
    const userID = req.params.id;
    const user = await userModel.getUser(userID);
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

async function deleteUser(req, res) {
  try {
    const userID = req.params.id;
    const result = await userModel.deleteUser(userID);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  deleteUser,
};