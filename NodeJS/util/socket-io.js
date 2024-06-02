const environment = require('../models/environment')

function start(io) {
    console.log("Start io")
    io.on('connection', function(socket) {
        console.log("Socket connected")
        socket.on('disconnect',() => {
            console.log("Disconnected")
        })
        socket.on('Env-data',async () => {
            console.log("On socket")
            try
            { 
                const documents = await environment.find().sort({ timestamp: -1 }).limit(30).exec();
                // console.log("Get data environment successfully!")
                io.sockets.emit('Send-data', documents);
            }
            catch (err) {
                console.log("Get data error :" + {err})
            }
        })
    })
}

module.exports = {start}