const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const savedExercisesSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  exercises: [
    {
      data: {
        type: Object,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('SavedExercises', savedExercisesSchema);
