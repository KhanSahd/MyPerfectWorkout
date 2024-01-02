const mongoose = require('mongoose');
const socketIo = require('socket.io');

const connectDB = async (io) => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    const exercises = conn.connection.db.collection('savedexercises');
    changeStream = exercises.watch();
    const users = conn.connection.db.collection('users');
    userChangeStream = users.watch();

    changeStream.on('change', async (next) => {
      switch (next.operationType) {
        case 'insert':
          io.emit('exerciseAdded', next.fullDocument);
          break;
        case 'update':
          // Fetch the full document using _id
          const updatedDocumentId = next.documentKey._id;
          const updatedDocument = await exercises.findOne({ _id: updatedDocumentId });

          // Access user information from the full document
          const userId = updatedDocument.userId; // Assuming userId is a field in the document

          // Emit the updated information with user details
          io.emit('exerciseUpdated', {
            user: userId,
            updatedFields: next.updateDescription.updatedFields,
          });
          break;
        case 'delete':
          const deletedDocumentId = next.documentKey._id;
          const deletedDocument = await exercises.findOne({ _id: deletedDocumentId });
          // const userId2 = deletedDocumentId.userId;
          io.emit('exerciseDeleted');
          break;
        default:
          console.log('Something went wrong');
      }
    });

    userChangeStream.on('change', async (next) => {
      switch (next.operationType) {
        case 'update':
          const updatedDocumentId = next.documentKey._id;
          const updatedDocument = await users.findOne({ _id: updatedDocumentId });
          io.emit('userUpdated', {
            user: updatedDocument,
            updatedFields: next.updateDescription.updatedFields,
          });
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
