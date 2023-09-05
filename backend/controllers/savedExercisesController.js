const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SavedExercise = require("../models/savedExerciseModel");

// @desc    Get all saved exercises
// @route   GET /api/exercises
// @access  Public
const getExercises = asyncHandler(async (req, res) => {
  const exercises = await SavedExercise.find();
  res.status(200).json(exercises);
});

const saveExercise = asyncHandler(async (req, res) => {
  const { name, exerciseIds, userId } = req.body;

  if (!name || !exerciseIds || !userId) {
    res.status(400).json({ message: "Please fill in all fields" });
    return;
  }

  const workoutExist = await SavedExercise.findOne({ name, userId });

  if (workoutExist) {
    // Add the new exerciseIds to the existing collection
    await SavedExercise.findOneAndUpdate(
      { name, userId },
      { $addToSet: { exercises: { $each: exerciseIds } } } // $addToSet ensures no duplicates
    );
    res.status(200).json({ message: "Exercises saved" });
  } else {
    // Create a new collection for the user
    const workout = await SavedExercise.create({
      name,
      exercises: exerciseIds,
      userId,
    });
    res.status(201).json({ message: "Exercises saved" });
  }
});

module.exports = { getExercises, saveExercise };
