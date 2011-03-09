/**
 * Wrapper for the express framework
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

var express = require('express');

function start(port, twitter) {
    var app = express.createServer();
    app.use(express.static(__dirname + '/../public'));
    app.use(express.bodyParser());

    app.get('/', function (request, response) {
        response.render('index.jade', { port: port });
    });

    app.post('/statuses/update', function (request, response) {
        twitter.update(request.body.status.text);
    });

    app.listen(port);

    return app;
}

exports.start = start;
