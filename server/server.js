//jshint esversion: 6

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validations');
const publicPath = path.join(__dirname, '../public');
const app = express();

app.use(express.static(publicPath));

let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');



  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and Room name are required!');
    } else {

      socket.join(params.room);

      socket.emit('newMessage', generateMessage('Admin', 'Greetings to the Chat App!'));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
      callback();
    }
  });

  socket.on('createMessage', (message, callback) => {
      console.log("New message: ", message);
      io.emit('newMessage', generateMessage(message.from, message.text));

      callback('');

  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});



app.get('/', function(req, res){
    res.sendFile('index');
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});


