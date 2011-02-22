var express = require('express');

function start(port, twitter) {
    var app = express.createServer();
    app.use(express.staticProvider(__dirname + '/../public'));
    app.use(express.bodyDecoder());

    app.get('/', function (request, response) {
        response.render('index.jade');
    });

    app.post('/statuses/update', function (request, response) {
        twitter.update(request.body.status.text);
    });

    app.listen(port);

    return app;
}

exports.start = start;
