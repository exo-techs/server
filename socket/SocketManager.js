class SocketManager {

    constructor() {
        this.instance = null;
        this.hardwareConnection = null;
        this.userConnections = {};

        // Hack for this
        this.cacheHardware = this.cacheHardware.bind(this);
        this.cacheUser = this.cacheUser.bind(this);
        this.emitHardware = this.emitHardware.bind(this);
        this.emitUsers = this.emitUsers.bind(this);
    }

    cacheHardware(socket) {
        this.hardwareConnection = socket;
    }

    cacheUser(userId, socket) {
        this.userConnections[userId] = socket;
    }

    /**
     * Emit messsage to hardware socket
     * @param {*} event 
     * @param {*} data 
     */
    emitHardware(event, data) {
        this.hardwareConnection && this.hardwareConnection.emit(event, data);
    }

    /**
     * Emit message to all connected users
     * @param {*} event 
     * @param {*} data 
     */
    emitUsers(event, data) {
        if (this.userConnections) {
            Object.keys(this.userConnections).forEach(userId => {
                this.userConnections[userId].emit(event, data)
            });
        }
    }

    static getInstance() {
        if (!SocketManager.instance) {
            SocketManager.instance = new SocketManager();
        }

        return SocketManager.instance;
    }
}

module.exports = SocketManager;