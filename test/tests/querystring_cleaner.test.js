var testCase = require('nodeunit').testCase,
    querystringCleaner = require('../../lib/querystring_cleaner');

exports['clean'] = testCase({
    'returns the same url if there is no querystring': function (test) {
        test.equals('http://example.com', querystringCleaner.clean('http://example.com', ['test']));
        test.done();
    },
    'removes specified param': function (test) {
        test.equals('http://example.com', querystringCleaner.clean('http://example.com?test=value', ['test']));
        test.done();
    },
    'removes specified param but leaves other params': function (test) {
        test.equals('http://example.com?a=1', querystringCleaner.clean('http://example.com?test=value&a=1', ['test']));
        test.done();
    }
});
