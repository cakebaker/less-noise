var testCase = require('nodeunit').testCase,
    linkhelper = require('../linkhelper');

const URL_ONE = 'http://example.com';
const URL_TWO = 'http://example.org';

exports['autolink of a status'] = testCase({
    'text without any links': function (test) {
        var status = { text: 'hello world', entities: { urls: [] } };
        linkhelper.autolink(status);
        test.equals('hello world', status.linked_text);
        test.done();
    },
    'text with a single link': function (test) {
        var status = { text: 'a link: ' + URL_ONE, entities: { urls: [ { url: URL_ONE } ] } };
        linkhelper.autolink(status);
        test.equals('a link: <a href="' + URL_ONE + '">' + URL_ONE + '</a>', status.linked_text);
        test.done();
    },
    'text with two links': function (test) {
        var status = { text: 'two links: ' + URL_ONE + ' ' + URL_TWO, entities: { urls: [ { url: URL_ONE }, { url: URL_TWO } ] } };
        linkhelper.autolink(status);
        test.equals('two links: <a href="' + URL_ONE + '">' + URL_ONE + '</a> <a href="' + URL_TWO + '">' + URL_TWO + '</a>', status.linked_text);
        test.done();
    }
});

exports['autolink of a retweet'] = testCase({
    'text without any links': function (test) {
        var retweet = { retweeted_status: { text: 'hello world', entities: { urls: [] } } };
        linkhelper.autolink(retweet);
        test.equals('hello world', retweet.retweeted_status.linked_text);
        test.done(); 
    },
    'text with a single link': function (test) {
        var retweet = { retweeted_status: { text: 'a link: ' + URL_ONE, entities: { urls: [ { url: URL_ONE } ] } } };
        linkhelper.autolink(retweet);
        test.equals('a link: <a href="' + URL_ONE + '">' + URL_ONE + '</a>', retweet.retweeted_status.linked_text);
        test.done();
    },
    'text with two links': function (test) {
        var retweet = { retweeted_status: { text: 'two links: ' + URL_ONE + ' ' + URL_TWO, entities: { urls: [ { url: URL_ONE }, { url: URL_TWO } ] } } };
        linkhelper.autolink(retweet);
        test.equals('two links: <a href="' + URL_ONE + '">' + URL_ONE + '</a> <a href="' + URL_TWO + '">' + URL_TWO + '</a>', retweet.retweeted_status.linked_text);
        test.done();
    }
});
