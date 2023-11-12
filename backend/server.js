const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const { errorHandler } = require('./middleware/errorMiddleware');
const colors = require('colors');
const connectDB = require('./config/db');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

// Socket.io
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:8000',
  },
});

// io.on('connection', (socket) => {
//   console.log('New client connected');

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

connectDB(io);

// setInterval(() => {
//   // io.to('clock-room').emit('time', new Date());
// }, 1000);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/exercises', require('./routes/savedExercisesRoutes'));

app.use(errorHandler);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

server.listen(port, (err) => {
  if (err) console.log(err);
  console.log('Socket server running on Port ', port);
});
