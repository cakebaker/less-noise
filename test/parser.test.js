var testCase = require('nodeunit').testCase,
    Parser = require('../parser').Parser;

exports['Parser#parse'] = testCase({
    setUp: function (callback) {
        this.parser = new Parser();
        callback();
    },
    'ignore carriage return newline': function (test) {
        test.strictEqual(false, this.parser.parse('\r\n'));
        test.done();
    },
    'ignore invalid json': function (test) {
        test.strictEqual(false, this.parser.parse('{"invalid":'));
        test.done();
    },
    'combine two invalid json strings to get a correct json string': function (test) {
        test.expect(3);
        this.parser.on('status', function (status) {
            var expectedObject = { text: "foo" };
            test.deepEqual(expectedObject, status);
        });
        test.strictEqual(false, this.parser.parse('{"text":'));
        test.strictEqual(true, this.parser.parse('"foo"}'));
        test.done();
    },
    'recognize a friends response': function (test) {
        test.expect(2);
        this.parser.on('friends', function (friends) {
            test.deepEqual([1, 2, 3], friends);
        });
        test.strictEqual(true, this.parser.parse('{"friends":[1,2,3]}'));
        test.done();
    },
    'recognize a status': function (test) {
        test.expect(2);
        this.parser.on('status', function (status) {
            var expectedObject = { text: "foo" };
            test.deepEqual(expectedObject, status);
        });
        test.strictEqual(true, this.parser.parse('{"text":"foo"}'));
        test.done();
    },
    'recognize a retweet': function (test) {
        test.expect(2);
        this.parser.on('retweet', function (retweet) {
            var expectedObject = { text: "foo", retweeted_status: {} };
            test.deepEqual(expectedObject, retweet);
        });
        test.strictEqual(true, this.parser.parse('{"text":"foo","retweeted_status":{}}'));
        test.done();
    }
});
