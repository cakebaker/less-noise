var config = require('./config').config(),
    parser = require('./parser').Parser(),
    twitter = require('./twitter').Twitter(config);

twitter.stream(parser);
