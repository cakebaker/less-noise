var express = require('express'),
    io = require('socket.io'),
    config = require('./config').config(),
    parser = require('./parser').Parser(),
    twitter = require('./twitter').Twitter(config);

var app = express.createServer();
app.use(express.staticProvider(__dirname + '/public'));

app.get('/', function (request, response) {
    response.render('index.jade');
});

app.listen(config.port);
var socket = io.listen(app);

parser.on('status', function (status) {
    socket.broadcast(status);
});

twitter.stream(parser);
