"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rpi_gpio_1 = __importDefault(require("rpi-gpio"));
// import path from "path";
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
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
rpi_gpio_1.default.setup(INI1, rpi_gpio_1.default.DIR_HIGH);
rpi_gpio_1.default.setup(INI2, rpi_gpio_1.default.DIR_HIGH);
rpi_gpio_1.default.setup(INI3, rpi_gpio_1.default.DIR_HIGH);
rpi_gpio_1.default.setup(INI4, rpi_gpio_1.default.DIR_HIGH);
// Main switch control
io.on('connection', (socket) => {
    socket.on('s1', (data) => {
        rpi_gpio_1.default.write(INI1, data);
    });
});
io.on('connection', (socket) => {
    socket.on('s2', (data) => {
        rpi_gpio_1.default.write(INI2, data);
    });
});
io.on('connection', (socket) => {
    socket.on('s3', (data) => {
        rpi_gpio_1.default.write(INI3, data);
    });
});
io.on('connection', (socket) => {
    socket.on('s4', (data) => {
        rpi_gpio_1.default.write(INI4, data);
    });
});
