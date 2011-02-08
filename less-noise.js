var express = require('express'),
    io = require('socket.io'),
    config = require('./config').config(),
    Expander = require('./lib/tweet_url_expander').TweetUrlExpander,
    linkHelper = require('./lib/link_helper'),
    parser = require('./lib/parser').Parser(),
    twitter = require('./lib/twitter').Twitter(config);

var expander = new Expander();

var app = express.createServer();
app.use(express.staticProvider(__dirname + '/public'));

app.get('/', function (request, response) {
    response.render('index.jade');
});

app.listen(config.port);
var socket = io.listen(app);

parser.on('tweet', function (tweet) {
    expander.expand(tweet);
});

expander.on('expanded', function (tweet) {
    linkHelper.autolink(tweet);
    socket.broadcast(tweet);
});

twitter.stream(parser);
