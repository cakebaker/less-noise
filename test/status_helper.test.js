var testCase = require('nodeunit').testCase,
    statusHelper = require('../status_helper');

exports['getUrlsAsArray'] = testCase({
    'status without urls': function (test) {
        var status = { text: 'text without urls', entities: { urls: [] } };
        test.deepEqual([], statusHelper.getUrlsAsArray(status));
        test.done();
    },
    'status with url': function (test) {
        const URL = 'http://example.com';
        var status = { text: 'text with url: ' + URL, entities: { urls: [ { url: URL } ] } };
        test.deepEqual([URL], statusHelper.getUrlsAsArray(status));
        test.done();
    }
});

exports['hasUrls'] = testCase({
    'status without urls': function (test) {
        var status = { text: 'text without urls', entities: { urls: [] } };
        test.strictEqual(false, statusHelper.hasUrls(status));
        test.done();
    },
    'status with url': function (test) {
        const URL = 'http://example.com';
        var status = { text: 'text with url: ' + URL, entities: { urls: [ { url: URL } ] } };
        test.strictEqual(true, statusHelper.hasUrls(status));
        test.done();
    }
});
