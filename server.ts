import express from 'express';
import GPIO from 'rpi-gpio';
// import path from "path";
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

server.listen(8000);

// Variables for the gpio pins
const INI1 = 8;
const INI2 = 10;
const INI3 = 12;
const INI4 = 16;

// Gpio modes are set to out and it's state is off
// P.S. I am setting all to high as my relay board has inverted logic
GPIO.setup(INI1, GPIO.DIR_HIGH);
GPIO.setup(INI2, GPIO.DIR_HIGH);
GPIO.setup(INI3, GPIO.DIR_HIGH);
GPIO.setup(INI4, GPIO.DIR_HIGH);

// Main switch control
io.on('connection', (socket: Socket) => {
  socket.on('s1', (data) => {
    GPIO.write(INI1, data);
  });
});

io.on('connection', (socket: Socket) => {
  socket.on('s2', (data) => {
    GPIO.write(INI2, data);
  });
});

io.on('connection', (socket: Socket) => {
  socket.on('s3', (data) => {
    GPIO.write(INI3, data);
  });
});

io.on('connection', (socket: Socket) => {
  socket.on('s4', (data) => {
    GPIO.write(INI4, data);
  });
});
