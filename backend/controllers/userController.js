const asyncHandler = require("express-async-handler");

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User route is working!" });
});

// @desc    Create/login a user
// @route   POST /api/users
// @access  Private
const setUser = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please enter a name");
  }
  res.status(200).json({ message: "Register/Login user route is working!" });
});

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Update user ${req.params.id} route working!` });
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json({ message: `Delete user ${req.params.id} route working!` });
});

module.exports = { getUsers, setUser, updateUser, deleteUser };
