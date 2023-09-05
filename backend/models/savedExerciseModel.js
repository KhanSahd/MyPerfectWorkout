const mongoose = require("mongoose");
const userModel = require("./userModel");
const Schema = mongoose.Schema;

const savedExerciseSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
});

module.exports = mongoose.model("SavedExercise", savedExerciseSchema);
