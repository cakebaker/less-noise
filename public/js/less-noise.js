$(document).ready(function () {
    var socket = new io.Socket('localhost', {port: 3000});
    socket.connect();
    socket.on('message', function (data) {
        $('#tweets').prepend('<div class="tweet"><img src="' + data.profile_image_url + '" width="48" height="48" /><strong>' + data.screen_name + '</strong>: ' + data.text + '</div>');
    });
});
