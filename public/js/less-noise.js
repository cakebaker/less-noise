$(document).ready(function () {
    var socket = new io.Socket('localhost', {port: 3000});
    socket.connect();
    socket.on('message', function (tweet) {
        var data;

        if (!tweet.data.retweeted_status) {
            data = { screen_name: tweet.data.user.screen_name,
                     name: tweet.data.user.name,
                     profile_image_url: tweet.data.user.profile_image_url,
                     text: tweet.data.text,
                     created_at: tweet.data.created_at
            };
        } else {
            data = { screen_name: tweet.data.retweeted_status.user.screen_name,
                     name: tweet.data.retweeted_status.user.name,
                     profile_image_url: tweet.data.retweeted_status.user.profile_image_url,
                     text: tweet.data.retweeted_status.text,
                     created_at: tweet.data.retweeted_status.created_at,
                     retweeter: tweet.data.user.screen_name
            };
        }

        var template = $('#tweetTemplate').tmpl(data);
        template.find('time.relative').timeago();
        template.prependTo('#tweets');
    });
});
