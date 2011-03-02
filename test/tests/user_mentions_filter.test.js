var testCase = require('nodeunit').testCase,
    factory = require('../utils/tweet_factory'),
    UserMentionsFilter = require('../../lib/filters/user_mentions_filter');

const UNWANTED_USER_MENTION = 'testuser';

exports['UserMentionsFilter#accept'] = testCase({
    setUp: function (callback) {
        var config = { users: [UNWANTED_USER_MENTION] };
        this.userMentionsFilter = new UserMentionsFilter(config);
        callback();
    },
    'accepts tweet without user mentions': function (test) {
        var that = this;

        [factory.createStatus, factory.createRetweet].forEach(function (createTweet) {
            var tweet = createTweet();
            test.strictEqual(true, that.userMentionsFilter.accept(tweet));
        });

        test.done();
    },
    'accepts tweet with user mention not in filter list': function (test) {
        var that = this;

        getTweetCreationFunctions().forEach(function (createTweet) {
            var tweet = createTweet(['username']);
            test.strictEqual(true, that.userMentionsFilter.accept(tweet));
        });

        test.done();
    },
    'rejects tweet with user mention in filter list': function (test) {
        var that = this;

        getTweetCreationFunctions().forEach(function (createTweet) {
            var tweet = createTweet([UNWANTED_USER_MENTION]);
            test.strictEqual(false, that.userMentionsFilter.accept(tweet));
        });

        test.done();
    }
});

function getTweetCreationFunctions() {
    return [factory.createStatusWithUserMentions, factory.createRetweetWithUserMentions];
}
