const server = require('http').createServer();
const io = require('socket.io')(server);

let sensorData;

io.on('connection', client => {
    client.on('sensorData', data => {
        console.log('Data arrived', data);
        sensorData = data;
    });
    client.on('disconnect', () => { /* … */ });

    // TODO: Create data structure that contains omega client, and browser clients array
    // TODO: Remove from here
    setInterval(() => {
        io.emit('clientData', sensorData);
    }, 2000);
});

server.listen(3000);