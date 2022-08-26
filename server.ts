import express from 'express';
// import {Server} from 'http';
import ioserver, {Socket} from 'socket.io'

const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http);
const Gpio = require('onoff').Gpio;

// const io = ioserver(http);
const s1 = new Gpio(2, 'out');

http.listen(8080)

io.on('connection', (socket: Socket) => {
    let s1Val = 0;
    socket.on('value', (data) => {
        s1Val = data;
        
    })
})
