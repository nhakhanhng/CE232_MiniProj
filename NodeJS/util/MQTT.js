const mqtt = require('mqtt')
const socketio = require('socket.io')
// const Firebase = require("./Firebase")
const controller = require('../controller/main')
let MQTTconfig = {
    port: 1883,
    clientId: "Nodejs",
    username: "etsIt8ezRsR0tVJVNdMydJRhIOlR2FINMx5H2eqZrTsMcVPNW2TAa6Z4HyrLZ0Qr",
}

let client

const SubTopic = "CE232/LAB05"



function setValue(type, room, status) {
    let payload = {}
    payload.type = type
    payload.room = room
    payload.status = status
    console.log(payload)
    // client.publish(PubTopic, JSON.stringify(payload))
}


module.exports = {
    start(io) {
        client = mqtt.connect("mqtt://mqtt.flespi.io", MQTTconfig)
        client.on('connect', () => {
            console.log("MQTT connected")
            client.subscribe(SubTopic, (err) => {
                console.log(err)
            })

            // client.publish(SubTopic, 'Connected')
        })

        client.on('message', (topic, payload) => {
            console.log(JSON.parse(payload))
            data_json = JSON.parse(payload)
            controller.addData(data_json)
            io.sockets.emit("Env-update")
        })
    }
}

