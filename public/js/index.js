var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newEmail', function(email){
    console.log('New email', email);

});

socket.on('newMessage', function(message){
    console.log('New message', message);
    let li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});


socket.emit('createMessage', {
    from: "Frank",
    text: "This is text"
}, function (data) {
    console.log('Got it', data);
});

$('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function (){

    });
});

