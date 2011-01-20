var sys = require('sys'),
    events = require('events'),
    OAuth = require('oauth').OAuth;

const USER_STREAM_URL = 'https://userstream.twitter.com/2/user.json';

function Twitter(config) {
    if (!(this instanceof Twitter)) return new Twitter(config);

    events.EventEmitter.call(this);

    this.consumer = new OAuth(null, null, config.consumerKey, config.consumerSecret, '1.0', null, 'HMAC-SHA1');
    this.oauthToken = config.oauthToken;
    this.oauthTokenSecret = config.oauthTokenSecret;
};

sys.inherits(Twitter, events.EventEmitter);
exports.Twitter = Twitter;

Twitter.prototype.stream = function (parser) {
    var request = this.consumer.get(USER_STREAM_URL, this.oauthToken, this.oauthTokenSecret);
    
    request.on('response', function (response) {
        response.setEncoding('utf8');
        response.on('data', parser.parse);
    });

    request.end();
};
