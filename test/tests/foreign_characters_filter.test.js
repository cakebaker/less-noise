var testCase = require('nodeunit').testCase,
    factory = require('../utils/tweet_factory'),
    ForeignCharsFilter = require('../../lib/filters/foreign_characters_filter');

exports['ForeignCharactersFilter#accept'] = testCase({
    setUp: function (callback) {
        var config = {};
        this.foreignCharsFilter = new ForeignCharsFilter(config);
        callback();
    },
    'accepts tweet with German characters': function (test) {
        var tweets = [factory.createStatus, factory.createRetweet];
        var i, tweet;

        for (i = 0; i < tweets.length; i++) {
            tweet = tweets[i].call(null, 'abcdefghijklmnopqrstuvwxyzäöü');
            test.strictEqual(true, this.foreignCharsFilter.accept(tweet));
        }

        test.done();
    },
    'rejects tweet with Cyrillic characters': function (test) {
        var tweets = [factory.createStatus, factory.createRetweet];
        var i, tweet;

        for (i = 0; i < tweets.length; i++) {
            tweet = tweets[i].call(null, 'Steam мне дрова на видяху обновляет, чертяка :)');
            test.strictEqual(false, this.foreignCharsFilter.accept(tweet));
        }

        test.done();
    },
    'rejects tweet with Japanese characters': function (test) {
        var tweets = [factory.createStatus, factory.createRetweet];
        var i, tweet;

        for (i = 0; i < tweets.length; i++) {
            tweet = tweets[i].call(null, 'うお！気がついたら３日くらいツイートしてなかった。');
            test.strictEqual(false, this.foreignCharsFilter.accept(tweet));
        }

        test.done();
    },
    'rejects tweet with Thai characters': function (test) {
        var tweets = [factory.createStatus, factory.createRetweet];
        var i, tweet;

        for (i = 0; i < tweets.length; i++) {
            tweet = tweets[i].call(null, 'ว่าจะลางานช่วงบ่าย ฟัง ดร.สนอง วรอุไร บรรยาย งานเข้าแบบนี้ คงอด :P');
            test.strictEqual(false, this.foreignCharsFilter.accept(tweet));
        }

        test.done();
    }
});
