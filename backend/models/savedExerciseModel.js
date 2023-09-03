const mongoose = require("mongoose");

const savedExerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  exercises: {
    type: Array,
    required: [true, "Please add exercises"],
  },
});

module.exports = mongoose.model("SavedExercise", savedExerciseSchema);
