var Tweet = require('../../lib/tweet').Tweet;

function createStatus() {
    return new Tweet(_createStatusObj());
}

exports.createStatus = createStatus;

function createStatusWithHashtags(hashtags) {
    var data = _createStatusObj();
    data.entities.hashtags = _createHashtagsObj(hashtags);

    return new Tweet(data);
}

exports.createStatusWithHashtags = createStatusWithHashtags;

function createStatusWithUrls(urls, expandedUrls, message) {
    var data = _createStatusObj(message);
    data.entities.urls = _createUrlsObj(urls, expandedUrls);

    return new Tweet(data);
}

exports.createStatusWithUrls = createStatusWithUrls;

function createStatusWithUserMentions(userMentions, message) {
    var data = _createStatusObj(message);
    data.entities.user_mentions = _createUserMentionsObj(userMentions);

    return new Tweet(data);
}

exports.createStatusWithUserMentions = createStatusWithUserMentions;

function createRetweet() {
    return new Tweet(_createRetweetObj());
}

exports.createRetweet = createRetweet;

function createRetweetWithHashtags(hashtags) {
    var data = _createRetweetObj();
    data.retweeted_status.entities.hashtags = _createHashtagsObj(hashtags);

    return new Tweet(data);
}

exports.createRetweetWithHashtags = createRetweetWithHashtags;

function createRetweetWithUrls(urls, expandedUrls, message) {
    var data = _createRetweetObj(message);
    data.retweeted_status.entities.urls = _createUrlsObj(urls, expandedUrls);

    return new Tweet(data);
}

exports.createRetweetWithUrls = createRetweetWithUrls;

function createRetweetWithUserMentions(userMentions, message) {
    var data = _createRetweetObj(message);
    data.retweeted_status.entities.user_mentions = _createUserMentionsObj(userMentions);

    return new Tweet(data);
}

exports.createRetweetWithUserMentions = createRetweetWithUserMentions;

function _createHashtagsObj(hashtags) {
    var i, result = [];

    for (i = 0; i < hashtags.length; i++) {
        result.push({ text: hashtags[i] });
    }

    return result;
}

function _createUrlsObj(urls, expandedUrls) {
    var i, result = [];

    for (i = 0; i < urls.length; i++) {
        result.push({ url: urls[i], expanded_url: (expandedUrls === undefined) ? '' : expandedUrls[i] });
    }

    return result;
}

function _createUserMentionsObj(userMentions) {
    var i, result = [];

    for (i = 0; i < userMentions.length; i++) {
        result.push({ screen_name: userMentions[i] });
    }

    return result;
}

function _createRetweetObj(message) {
    return { retweeted_status: _createStatusObj(message) };
}

function _createStatusObj(message) {
    return { text: (message === undefined) ? '' : message, entities: { urls: [], hashtags: [], user_mentions: [] } };
}
