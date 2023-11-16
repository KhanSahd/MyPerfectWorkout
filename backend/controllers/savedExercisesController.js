const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SavedExercise = require('../models/savedExerciseModel');
const mongoose = require('mongoose');
const socketIo = require('socket.io');

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
  const { workoutId, data, name } = req.body;
  const workout = await SavedExercise.findById(workoutId);
  let addToWorkout;
  if (!workout) {
    res.status(400).json({ message: 'Workout not found' });
    return;
  }
  if (!name) {
    addToWorkout = await SavedExercise.findByIdAndUpdate(
      workoutId,
      { $addToSet: { exercises: { data } } },
      { new: true, fullDocument: true }
    );
  } else {
    addToWorkout = await SavedExercise.findByIdAndUpdate(workoutId, { $set: { name: name } });
  }

  if (addToWorkout) {
    // io.emit('exerciseUpdated', { workout: addToWorkout, userId });
    res.status(201).json({ message: 'Exercises saved' });
  } else {
    res.status(400).json({ message: 'Unable to save exercise' });
  }
});

const deleteWorkout = asyncHandler(async (req, res) => {
  const { workoutId, exerciseId } = req.query;
  const workout = await SavedExercise.findById(workoutId);
  let deleteWorkout;
  if (!workout) {
    res.status(400).json({ message: 'Workout not found' });
    return;
  }

  if (!exerciseId) {
    deleteWorkout = await SavedExercise.findByIdAndDelete(workoutId, {
      new: true,
      fullDocument: true,
    });
  } else {
    deleteWorkout = await SavedExercise.findByIdAndUpdate(
      workoutId,
      {
        $pull: { exercises: { 'data.id': exerciseId } },
      },
      { new: true, fullDocument: true }
    );
  }

  if (deleteWorkout) {
    res.status(200).json(deleteWorkout);
  } else {
    res.status(400).json({ message: 'Unable to delete exercise' });
  }
});

module.exports = { getExercises, saveExercise, updateWorkout, deleteWorkout };
