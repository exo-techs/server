const server = require('http').createServer();
const io = require('socket.io')(server);
const events = require('./socket/SocketEvents');
const SocketManager = require('./socket/SocketManager');

const socketManager = SocketManager.getInstance();

io.on('connection', socket => {

    socket.on(events.USER_CONNECT, ({ userId }) => {
        // TODO: User connects save to socket manager
        socketManager.cacheUser(userId, socket);
    })

    socket.on(events.HARDWARE_CONNECT, data => {
        // TODO: Hardware connects save to socket manager
        socketManager.cacheHardware(socket);
    })

    socket.on(events.SENSOR_DATA, data => {
        console.log('Data arrived', data);
        socketManager.emitUsers('clientData', data);
        // sensorData = data;
    });

    socket.on(events.TOGGLE_RELAY, data => {
        socketManager.emitHardware(events.TOGGLE_RELAY, data);
    })
    
    socket.on('disconnect', () => { /* … */ });
    
    // TODO: Create data structure that contains omega client, and browser clients array
    // TODO: Remove from here
    // setInterval(() => {
    //     if (sensorData) {
    //         io.emit('clientData', sensorData);
    //     }
    // }, 2000);
});

server.listen(3001);