const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    const exercises = conn.connection.db.collection('savedexercises');
    changeStream = exercises.watch();

    changeStream.on('change', (next) => {
      switch (next.operationType) {
        case 'insert':
          io.emit('exerciseAdded', next.fullDocument);
          break;
        case 'update':
          io.emit('exerciseUpdated', next.fullDocument);
          break;
        case 'delete':
          io.emit('exerciseDeleted', next.documentKey._id);
          break;
        default:
          console.log('Something went wrong');
      }
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1); // 1 is failure
  }
};

module.exports = connectDB;
