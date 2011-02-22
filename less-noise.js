var express = require('express'),
    io = require('socket.io'),
    config = require('./config').config(),
    Expander = require('./lib/tweet_url_expander').TweetUrlExpander,
    Tweet = require('./lib/tweet').Tweet,
    linkHelper = require('./lib/link_helper'),
    parser = require('./lib/parser').Parser(),
    urlFilter = require('./lib/url_filter').UrlFilter(config),
    hashtagFilter = require('./lib/hashtag_filter').HashtagFilter(config),
    twitter = require('./lib/twitter').Twitter(config);

var expander = new Expander();

var app = express.createServer();
app.use(express.staticProvider(__dirname + '/public'));
app.use(express.bodyDecoder());

app.get('/', function (request, response) {
    response.render('index.jade');
});

app.post('/statuses/update', function (request, response) {
    twitter.update(request.body.status.text);
});

app.listen(config.port);
var socket = io.listen(app);

parser.on('tweet', function (data) {
    var tweet = new Tweet(data);

    if (hashtagFilter.accept(tweet)) {
        if (urlFilter.accept(tweet)) {
            tweet.expandUrls(expander);
        }
    }
});

expander.on('expanded', function (tweet) {
    tweet.autolink();
    socket.broadcast(tweet);
});

twitter.stream(parser);
