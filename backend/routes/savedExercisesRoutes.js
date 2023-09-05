const express = require("express");
const router = express.Router();
const {
  getExercises,
  saveExercise,
} = require("../controllers/savedExercisesController");

router.route("/").get(getExercises).post(saveExercise);

module.exports = router;
