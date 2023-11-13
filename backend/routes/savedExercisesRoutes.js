const express = require('express');
const router = express.Router();
const {
  getExercises,
  saveExercise,
  updateWorkout,
  deleteWorkout,
} = require('../controllers/savedExercisesController');

router.route('/').get(getExercises).put(updateWorkout).post(saveExercise).delete(deleteWorkout);

module.exports = router;
