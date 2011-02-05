var testCase = require('nodeunit').testCase,
    linkHelper = require('../lib/link_helper');

const URL_ONE = 'http://example.com';
const URL_TWO = 'http://example.org';

exports['autolink of a status'] = testCase({
    'text without any links': function (test) {
        var text = 'hello world';
        var status = createStatusWithoutUrls(text);
        linkHelper.autolink(status);
        test.equals(text, status.text);
        test.done();
    },
    'text with a single link': function (test) {
        var status = { text: 'a link: ' + URL_ONE, entities: createUrls([URL_ONE]) };
        linkHelper.autolink(status);
        test.equals('a link: <a href="' + URL_ONE + '">' + URL_ONE + '</a>', status.text);
        test.done();
    },
    'text with a shortened link': function (test) {
        var status = { text: 'a link: http://ex.am/ple', entities: { urls: [ { url: 'http://ex.am/ple', expanded_url: URL_ONE } ], user_mentions: [] } };
        linkHelper.autolink(status);
        test.equals('a link: <a href="' + URL_ONE + '">' + URL_ONE + '</a>', status.text);
        test.done();
    },
    'text with two links': function (test) {
        var status = { text: 'two links: ' + URL_ONE + ' ' + URL_TWO, entities: createUrls([URL_ONE, URL_TWO]) };
        linkHelper.autolink(status);
        test.equals('two links: <a href="' + URL_ONE + '">' + URL_ONE + '</a> <a href="' + URL_TWO + '">' + URL_TWO + '</a>', status.text);
        test.done();
    },
    'text mentioning a user': function (test) {
        var status = { text: 'hey @testuser', entities: { urls: [], user_mentions: [ { screen_name: 'testuser' } ] } };
        linkHelper.autolink(status);
        test.equals('hey @<a href="http://twitter.com/testuser">testuser</a>', status.text);
        test.done();
    }
});

exports['autolink of a retweet'] = testCase({
    'text without any links': function (test) {
        var text = 'hello world';
        var retweet = { retweeted_status: createStatusWithoutUrls(text) };
        linkHelper.autolink(retweet);
        test.equals(text, retweet.retweeted_status.text);
        test.done(); 
    },
    'text with a single link': function (test) {
        var retweet = { retweeted_status: { text: 'a link: ' + URL_ONE, entities: createUrls([URL_ONE]) } };
        linkHelper.autolink(retweet);
        test.equals('a link: <a href="' + URL_ONE + '">' + URL_ONE + '</a>', retweet.retweeted_status.text);
        test.done();
    },
    'text with a shortened link': function (test) {
        var retweet = { retweeted_status: { text: 'a link: http://ex.am/ple', entities: { urls: [ { url: 'http://ex.am/ple', expanded_url: URL_ONE } ], user_mentions: [] } } };
        linkHelper.autolink(retweet);
        test.equals('a link: <a href="' + URL_ONE + '">' + URL_ONE + '</a>', retweet.retweeted_status.text);
        test.done();
    },
    'text with two links': function (test) {
        var retweet = { retweeted_status: { text: 'two links: ' + URL_ONE + ' ' + URL_TWO, entities: createUrls([URL_ONE, URL_TWO]) } };
        linkHelper.autolink(retweet);
        test.equals('two links: <a href="' + URL_ONE + '">' + URL_ONE + '</a> <a href="' + URL_TWO + '">' + URL_TWO + '</a>', retweet.retweeted_status.text);
        test.done();
    },
    'text mentioning a user': function (test) {
        var retweet = { retweeted_status: { text: 'hey @testuser', entities: { urls: [], user_mentions: [ { screen_name: 'testuser' } ] } } };
        linkHelper.autolink(retweet);
        test.equals('hey @<a href="http://twitter.com/testuser">testuser</a>', retweet.retweeted_status.text);
        test.done();
    }
});

function createStatusWithoutUrls(text) {
    return {
        text: text,
        entities: createUrls([])
    };
}

function createUrls(urls) {
    var urlObjects = [];
    for (var i = 0; i < urls.length; i++) {
        urlObjects.push({ url: urls[i], expanded_url: urls[i] });
    }

    return {
        urls: urlObjects,
        user_mentions: []
    };
}
