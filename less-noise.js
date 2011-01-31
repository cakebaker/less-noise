var express = require('express'),
    io = require('socket.io'),
    config = require('./config').config(),
    Expander = require('./tweet_url_expander').TweetUrlExpander,
    linkHelper = require('./link_helper'),
    parser = require('./parser').Parser(),
    twitter = require('./twitter').Twitter(config);

var expander = new Expander();

var app = express.createServer();
app.use(express.staticProvider(__dirname + '/public'));

app.get('/', function (request, response) {
    response.render('index.jade');
});

app.listen(config.port);
var socket = io.listen(app);

parser.on('status', function (status) {
    expander.expand(status);
});

parser.on('retweet', function (retweet) {
    expander.expand(retweet);
});

expander.on('expanded', function (tweet) {
    linkHelper.autolink(tweet);
    socket.broadcast(tweet);
});

twitter.stream(parser);
