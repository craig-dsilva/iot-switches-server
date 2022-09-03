"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rpi_gpio_1 = __importDefault(require("rpi-gpio"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/build', 'index.html'));
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
];
// Gpio modes are set to out and it's state is off
// P.S. I am setting all to high as my relay board has inverted logic
rpi_gpio_1.default.setup(INI1, rpi_gpio_1.default.DIR_HIGH);
rpi_gpio_1.default.setup(INI2, rpi_gpio_1.default.DIR_HIGH);
rpi_gpio_1.default.setup(INI3, rpi_gpio_1.default.DIR_HIGH);
rpi_gpio_1.default.setup(INI4, rpi_gpio_1.default.DIR_HIGH);
// Main switch control
io.on('connection', (socket) => {
    socket.emit('state', relayState);
    for (let i = 0; i < relayState.length; i++) {
        socket.on(relayState[i].id.toString(), (data) => {
            relayState[i].switchState = data;
            rpi_gpio_1.default.write(relayState[i].GPIO_PIN, relayState[i].switchState);
        });
    }
});
server.listen(8000);
