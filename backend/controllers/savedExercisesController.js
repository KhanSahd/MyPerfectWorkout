const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SavedExercise = require('../models/savedExerciseModel');
const mongoose = require('mongoose');

// @desc    Get all saved exercises
// @route   GET /api/exercises
// @access  Public
const getExercises = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const exercises = await SavedExercise.find({ userId: id });
  res.status(200).json(exercises);
});

const saveExercise = asyncHandler(async (req, res) => {
  const { name, data, userId } = req.body;

  if (!name || !data || !userId) {
    res.status(400).json({ message: 'Please fill in all fields' });
    return;
  }

  const workoutExist = await SavedExercise.findOne({ name, userId });
  const exerciseInWorkout = workoutExist?.exercises.find(
    (exercise) => exercise.data._id === data._id
  );

  if (workoutExist && !exerciseInWorkout) {
    // Add the data to the existing exercises array if the exercises isn't already in the array
    await SavedExercise.findOneAndUpdate({ name, userId }, { $addToSet: { exercises: data } });
    res.status(200).json({ message: 'Exercises saved' });
  }

  if (workoutExist && exerciseInWorkout) {
    res.status(400).json({ message: 'Exercise already saved' });
  }

  // Create a new collection for the user
  const savedWorkout = await SavedExercise.create({
    name,
    exercises: data ? [{ data }] : [{ data: null }],
    userId,
  });
  if (savedWorkout) {
    res.status(201).json({ message: 'Exercises saved' });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

const updateWorkout = asyncHandler(async (req, res) => {
  const { workoutId, data } = req.body;
  const workout = await SavedExercise.findById(workoutId);
  const addToWorkout = await SavedExercise.findByIdAndUpdate(
    workoutId,
    { $addToSet: { exercises: { data } } },
    { new: true }
  );

  if (addToWorkout) {
    res.status(201).json({ message: 'Exercises saved' });
  } else {
    res.status(400).json({ message: 'Unable to save exercise' });
  }
});

module.exports = { getExercises, saveExercise, updateWorkout };
