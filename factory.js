function createStatus(status) {
    return {
        text: status.text,
        screen_name: status.user.screen_name,
        name: status.user.name,
        profile_image_url: status.user.profile_image_url
    };
}

exports.createStatus = createStatus;

function createRetweet(retweet) {
    return {
        text: retweet.retweeted_status.text,
        screen_name: retweet.retweeted_status.user.screen_name,
        name: retweet.retweeted_status.user.name,
        profile_image_url: retweet.retweeted_status.user.profile_image_url,
        retweeter_screen_name: retweet.user.screen_name
    };
}

exports.createRetweet = createRetweet;
