//jshint esversion: 6
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const app = express();

app.use(express.static(publicPath));

let server = http.createServer(app);
let io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Greetings to the Chat App!'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined the chat!'));

  socket.on('createMessage', (message) => {
      console.log("New message: ", message);
      io.emit('newMessage', generateMessage(message.from, message.text));
  //     io.broadcast.emit('New Broadcast Message', {
  //       from: message.from,
  //       text: message.text,
  //       createdAt: new Date().toDateString()
  //     });
  });

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


