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
        var that = this;

        getTweetCreationFunctions().forEach(function (createTweet) {
            var tweet = createTweet('abcdefghijklmnopqrstuvwxyzäöü');
            test.strictEqual(true, that.foreignCharsFilter.accept(tweet));
        });

        test.done();
    },
    'rejects tweet with Cyrillic characters': function (test) {
        var that = this;

        getTweetCreationFunctions().forEach(function (createTweet) {
            var tweet = createTweet('Steam мне дрова на видяху обновляет, чертяка :)');
            test.strictEqual(false, that.foreignCharsFilter.accept(tweet));
        });

        test.done();
    },
    'rejects tweet with Japanese characters': function (test) {
        var that = this;

        getTweetCreationFunctions().forEach(function (createTweet) {
            var tweet = createTweet('うお！気がついたら３日くらいツイートしてなかった。');
            test.strictEqual(false, that.foreignCharsFilter.accept(tweet));
        });

        test.done();
    },
    'rejects tweet with Thai characters': function (test) {
        var that = this;

        getTweetCreationFunctions().forEach(function (createTweet) {
            var tweet = createTweet('ว่าจะลางานช่วงบ่าย ฟัง ดร.สนอง วรอุไร บรรยาย งานเข้าแบบนี้ คงอด :P');
            test.strictEqual(false, that.foreignCharsFilter.accept(tweet));
        });

        test.done();
    }
});

function getTweetCreationFunctions() {
    return [factory.createStatus, factory.createRetweet];
}
