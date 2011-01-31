$(document).ready(function () {
    var socket = new io.Socket('localhost', {port: 3000});
    socket.connect();
    socket.on('message', function (tweet) {
        var data;

        if (!tweet.retweeted_status) {
            data = { screen_name: tweet.user.screen_name,
                     profile_image_url: tweet.user.profile_image_url,
                     text: tweet.text
            };
        } else {
            data = { screen_name: tweet.retweeted_status.user.screen_name,
                     profile_image_url: tweet.retweeted_status.user.profile_image_url,
                     text: tweet.retweeted_status.text
            };
        }

        $('#tweetTemplate').tmpl(data).prependTo('#tweets');
    });
});
