"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Gpio = require('onoff').Gpio;
// const io = ioserver(http);
const s1 = new Gpio(2, 'out');
http.listen(8080);
io.on('connection', (socket) => {
    let s1Val = 0;
    socket.on('value', (data) => {
        s1Val = data;
    });
});
