var Tweet = require('../../lib/tweet').Tweet;

function createStatus(message) {
    return new Tweet(_createStatusObj(message));
}

exports.createStatus = createStatus;

function createStatusFrom(username) {
    var data = _createStatusObj();
    data.user = _createUserObj(username);

    return new Tweet(data);
}

exports.createStatusFrom = createStatusFrom;

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

function createRetweet(message) {
    return new Tweet(_createRetweetObj(message));
}

exports.createRetweet = createRetweet;

function createRetweetFrom(username) {
    var data = _createRetweetObj();
    data.user = _createUserObj(username);

    return new Tweet(data);
}

exports.createRetweetFrom = createRetweetFrom;

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
    var result = [];

    hashtags.forEach(function (hashtag) {
        result.push({ text: hashtag });
    });

    return result;
}

function _createUrlsObj(urls, expandedUrls) {
    var result = [];

    urls.forEach(function (url, i) {
        result.push({ url: url, expanded_url: (expandedUrls === undefined) ? '' : expandedUrls[i] });
    });

    return result;
}

function _createUserMentionsObj(userMentions) {
    var result = [];

    userMentions.forEach(function (userMention) {
        result.push({ screen_name: userMention });
    });

    return result;
}

function _createUserObj(username) {
    return { screen_name: username };
}

function _createRetweetObj(message) {
    return { retweeted_status: _createStatusObj(message) };
}

function _createStatusObj(message) {
    return { text: (message === undefined) ? '' : message, entities: { urls: [], hashtags: [], user_mentions: [] } };
}
