$(document).ready(function () {
    var socket = new io.Socket('localhost', {port: 3000});
    socket.connect();
    socket.on('message', function (data) {
        $('#tweetTemplate').tmpl(data).prependTo('#tweets');
    });
});
