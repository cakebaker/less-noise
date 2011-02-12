$(document).ready(function () {
    var socket = new io.Socket('localhost', {port: 3000});
    socket.connect();
    socket.on('message', function (tweet) {
        var data;

        if (!tweet.data.retweeted_status) {
            data = { screen_name: tweet.data.user.screen_name,
                     profile_image_url: tweet.data.user.profile_image_url,
                     text: tweet.data.text
            };
        } else {
            data = { screen_name: tweet.data.retweeted_status.user.screen_name,
                     profile_image_url: tweet.data.retweeted_status.user.profile_image_url,
                     text: tweet.data.retweeted_status.text
            };
        }

        $('#tweetTemplate').tmpl(data).prependTo('#tweets');
    });
});
