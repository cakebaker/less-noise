/**
 * Twitter
 *
 * Requires node.js 0.4.0
 *
 * Copyright (c) by Daniel Hofstetter (daniel.hofstetter@42dh.com, http://cakebaker.42dh.com)
 *
 * Licensed under the MIT License: http://opensource.org/licenses/mit-license
 * Redistributions of files must retain the above copyright notice.
 */

var util = require('util'),
    events = require('events'),
    OAuth = require('oauth').OAuth;

const USER_STREAM_URL = 'https://userstream.twitter.com/2/user.json';
const STATUS_UPDATE_URL = 'https://api.twitter.com/1/statuses/update.json';

function Twitter(config) {
    if (!(this instanceof Twitter)) return new Twitter(config);

    events.EventEmitter.call(this);

    this.consumer = new OAuth(null, null, config.consumerKey, config.consumerSecret, '1.0', null, 'HMAC-SHA1');
    this.oauthToken = config.oauthToken;
    this.oauthTokenSecret = config.oauthTokenSecret;
};

util.inherits(Twitter, events.EventEmitter);
exports.Twitter = Twitter;

Twitter.prototype.stream = function (parser) {
    var request = this.consumer.get(USER_STREAM_URL, this.oauthToken, this.oauthTokenSecret);
    
    request.on('response', function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            parser.parse(chunk);
        });
    });

    request.end();
};

Twitter.prototype.update = function (message) {
    this.consumer.post(STATUS_UPDATE_URL, this.oauthToken, this.oauthTokenSecret, { status: message }, function (error, data) {
        if (error) {
            console.log(error);
        }
    });
};
