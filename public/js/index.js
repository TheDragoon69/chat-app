var socket = io();
socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createEmail', {
        to: 'crazykalus@germanyisreal.de',
        text: 'Hey, This is Andrew'

    });


});
socket.on('disconnect', function () {
    console.log('Disconnected from server');
})

socket.on('newEmail', function(email){
    console.log('New email', email);

});

socket.on('newMessage', function(message){
    console.log('New message', message);
})

socket.emit('createMessage', {
    from: "Big Smoke",
    text: "All you had to do CJ, is..."
});