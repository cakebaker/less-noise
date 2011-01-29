var express = require('express'),
    io = require('socket.io'),
    config = require('./config').config(),
    factory = require('./factory'),
    linkhelper = require('./linkhelper'),
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
    linkhelper.autolink(status);
    socket.broadcast(factory.createStatus(status));
});

parser.on('retweet', function (retweet) {
    linkhelper.autolink(retweet);
    socket.broadcast(factory.createRetweet(retweet));
});

twitter.stream(parser);
