import express from 'express';
import GPIO from 'rpi-gpio';
import path from "path";
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Variables for the gpio pins
const INI1 = 8;
const INI2 = 10;
const INI3 = 12;
const INI4 = 16;

// Data of the switches
const relayState = [
  { id: 0, switchNumber: 1, GPIO_PIN: INI1, switchState: true },
  { id: 1, switchNumber: 2, GPIO_PIN: INI2, switchState: true },
  { id: 2, switchNumber: 3, GPIO_PIN: INI3, switchState: true },
  { id: 3, switchNumber: 4, GPIO_PIN: INI4, switchState: true }
]

// Gpio modes are set to out and it's state is off
// P.S. I am setting all to high as my relay board has inverted logic
GPIO.setup(INI1, GPIO.DIR_HIGH);
GPIO.setup(INI2, GPIO.DIR_HIGH);
GPIO.setup(INI3, GPIO.DIR_HIGH);
GPIO.setup(INI4, GPIO.DIR_HIGH);

// Main switch control
io.on('connection', (socket: Socket) => {
  socket.emit('state', relayState)

  for (let i = 0; i < relayState.length; i++) {
    socket.on(relayState[i].id.toString(), (data) => {
      relayState[i].switchState = data;
      GPIO.write(relayState[i].GPIO_PIN, relayState[i].switchState);
    });
  }
});

server.listen(8000);