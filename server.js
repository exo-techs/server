const server = require('http').createServer();
// TODO: For development - should fix
const io = require('socket.io')(server, { origins: '*:*'});
const events = require('./socket/SocketEvents');
const SocketManager = require('./socket/SocketManager');
const socketManager = SocketManager.getInstance();
const SocketController = require('./socket/SocketController');

io.on('connection', socket => {

    const controller = SocketController(socketManager, socket);

    socket.on(events.USER_CONNECT, controller.handleUserConnect)
    socket.on(events.HARDWARE_CONNECT, controller.handleHardwareConnect)
    socket.on(events.SENSOR_DATA, controller.handleSensorData);
    socket.on(events.TOGGLE_RELAY, controller.handleToggleRelay)
    socket.on('disconnect', controller.handleDisconnect);
});

server.listen(3001);