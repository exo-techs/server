const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: '*:*' });
const port = process.env.PORT || 3002;

// TODO: For development - should fix
const events = require('./socket/SocketEvents');
const SocketManager = require('./socket/SocketManager');
const socketManager = SocketManager.getInstance();
const SocketController = require('./socket/SocketController');

app.get('/', function (req, res) {
    res.send('Hello exotech');
});

io.on('connection', socket => {
    const controller = SocketController(socketManager, socket);

    socket.on(events.USER_CONNECT, controller.handleUserConnect)
    socket.on(events.HARDWARE_CONNECT, controller.handleHardwareConnect)
    socket.on(events.SENSOR_DATA, controller.handleSensorData);
    socket.on(events.TOGGLE_RELAY, controller.handleToggleRelay)
    socket.on('disconnect', controller.handleDisconnect);
});

server.listen(port, function () {
    console.log('Listening on ' + port);
});