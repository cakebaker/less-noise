var testCase = require('nodeunit').testCase,
    linkHelper = require('../lib/link_helper');

const URL_ONE = 'http://example.com';
const URL_TWO = 'http://example.org';

exports['linkUrls'] = testCase({
    'text without any urls': function (test) {
        var text = 'hello world';
        test.equals(text, linkHelper.linkUrls(text, [], []));
        test.done();
    },
    'text with a single url': function (test) {
        var text = 'an url: http://example.com';
        test.equals('an url: <a href="http://example.com">http://example.com</a>', linkHelper.linkUrls(text, ['http://example.com'], ['http://example.com']));
        test.done();
    },
    'text with a shortened url': function (test) {
        var text = 'an url: http://ex.am/ple';
        test.equals('an url: <a href="http://example.com">http://example.com</a>', linkHelper.linkUrls(text, ['http://ex.am/ple'], ['http://example.com']));
        test.done();
    },
    'text with two urls': function (test) {
        var text = 'two urls: http://ex.am/ple http://example.org';
        test.equals('two urls: <a href="http://example.com">http://example.com</a> <a href="http://example.org">http://example.org</a>', linkHelper.linkUrls(text, ['http://ex.am/ple', 'http://example.org'], ['http://example.com', 'http://example.org']));
        test.done();
    }
});

exports['linkUserMentions'] = testCase({
    'text without any user mentions': function (test) {
        var text = 'hello world';
        test.equals(text, linkHelper.linkUserMentions(text, []));
        test.done();
    },
    'text mentioning a user': function (test) {
        var text = 'hello @test';
        test.equals('hello @<a href="http://twitter.com/test">test</a>', linkHelper.linkUserMentions(text, ['test']));
        test.done();
    }
});
