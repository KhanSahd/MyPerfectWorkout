const express = require('express');
const router = express.Router();
const {
  getExercises,
  saveExercise,
  updateWorkout,
} = require('../controllers/savedExercisesController');

router.route('/').get(getExercises).put(updateWorkout).post(saveExercise);

module.exports = router;
