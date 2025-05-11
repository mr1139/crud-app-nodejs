const express = require("express");
const router = express.Router();
const User = require("./../models/userModels");

// CREATE - Add new user
router.post("/users", async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const user = await User.create({ name, age, email });
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating user",
      error: error.message,
    });
  }
});

// READ - Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

// UPDATE - Update a user's information
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, age, email },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating user",
      error: error.message,
    });
  }
});

// DELETE - Delete a user
router.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
});

module.exports = router;
