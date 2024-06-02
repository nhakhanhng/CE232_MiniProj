const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
// Import mongoDB
const mongoose = require('mongoose');
const URI = 'mongodb+srv://nhakhanh292:iYvGzOZFnskIi3xX@env.kohsjgm.mongodb.net/CE232?retryWrites=true&w=majority'

const app = express()
var server = require("http").Server(app);

const mqtt = require("./util/MQTT");

const mainRouter = require('./routes/main')
const router = require('./routes/main')


var io = require("socket.io")(server);
const socket = require("./util/socket-io").start(io)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/",router)


mqtt.start(io)
mongoose
.connect(URI, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
  console.log("Connected to db")
//   //InitRole()
//   appPort = config.port;
// 	appHost = config.host;
	server.listen(8080, () => {
		// console.log(`Server listening at host ${appHost} port ${appPort}`);
    });
}).catch((err) => {
    console.log(err)
})