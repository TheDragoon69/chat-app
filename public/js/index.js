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

socket.on('newLocationMessage', function(message){
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);

    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    let messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function (){
        messageTextBox.val('');
    });
});

let locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if (!navigator.geolocation) {
        return alert('Geolocation Not Supported by the Browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Request...');

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(err) {
        if(err){
            throw err;
        }
    });
});
