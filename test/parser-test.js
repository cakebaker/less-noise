var Parser = require('../parser').Parser;

exports['ignore carriage return newline'] = function (test) {
    var parser = new Parser();
    test.strictEqual(false, parser.parse('\r\n'));
    test.done();
};

exports['parse a friends response'] = function (test) {
    test.expect(1);
    var parser = new Parser();
    parser.on('friends', function (friends) {
        test.deepEqual([1, 2, 3], friends);
    });
    parser.parse('{"friends":[1,2,3]}');
    test.done();
};

exports['parse a status'] = function (test) {
    test.expect(1);
    var parser = new Parser();
    parser.on('status', function (status) {
        var expectedObject = { text: "foo" };
        test.deepEqual(expectedObject, status);
    });
    parser.parse('{"text":"foo"}');
    test.done();
};

exports['parse a retweet'] = function (test) {
    test.expect(1);
    var parser = new Parser();
    parser.on('retweet', function (retweet) {
        var expectedObject = { text: "foo", retweeted_status: {} };
        test.deepEqual(expectedObject, retweet);
    });
    parser.parse('{"text":"foo","retweeted_status":{}}');
    test.done();
};
