
const events = require('./SocketEvents');


module.exports = (socketManager, socket) => ({
    // User connects save to socket manager
    handleUserConnect: ({ userId }) => {
        socketManager.cacheUser(userId, socket);
    },
    // Hardware connects save to socket manager
    handleHardwareConnect: (data) => {
        socketManager.cacheHardware(socket);
    },
    handleSensorData: data => {
        console.log('Data arrived', data);
        socketManager.emitUsers('clientData', data);
    },
    handleToggleRelay: data => {
        socketManager.emitHardware(events.TOGGLE_RELAY, data);
    },
    handleDisconnect: () => {
        console.log('Socket Disconnect');
    },
})