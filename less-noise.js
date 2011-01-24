var express = require('express'),
    config = require('./config').config(),
    parser = require('./parser').Parser(),
    twitter = require('./twitter').Twitter(config);

var app = express.createServer();
app.use(express.staticProvider(__dirname + '/public'));

app.get('/', function (request, response) {
    response.render('index.jade');
});

app.listen(config.port);

twitter.stream(parser);
