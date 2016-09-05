var u_twitch = "monstercat,kagaminium,witekm,byakogan_tv,otlet,shuzi,itskocyk";
var limit = 6;
getTwitch(u_twitch);


function getTwitch(stream) {
    $.ajax({
        url: 'https://api.twitch.tv/kraken/streams/?channel=' + stream,
        dataType: 'jsonp',
        success: function (channel) {
            $('#loading').remove();
            topStream(channel["streams"][0], 1);
            setTimeout(function () {
                $('#image' + channel["streams"][0]["channel"]["name"]).addClass("stream-active");
            }, 3000);
            for (var i = 0; i < limit ; i++) {
                renderBottomStreamList(channel["streams"][i]);
            }
        }, error: function () {
            console.log("Coś poszło nie tak podczas łączenia z api twitch");
        }
    });
}

function renderBottomStreamList(channel) {
    var name = channel["channel"]["name"];
    $("#streams-container").append('<div class="col-sm-4 text-md-center" id="' + name + '"></div>');
    $("#" + name).html('<img class="shadow" onclick="topStream(\'' + name + '\',0)" class="img-fluid stream" src="https://static-cdn.jtvnw.net/previews-ttv/live_user_' + name + '-320x180.jpg" id="image' + name + '" alt="' + name + '">');
}

function topStream(channel, type) {
    if (channel != null && type === 1) {
        $('#topstream').hide().attr('src', "https://player.twitch.tv/?html5=true&channel=" + channel["channel"]["name"]).fadeIn(1000);
        return 0;
    }
    $.ajax({
        url: 'https://api.twitch.tv/kraken/streams/?channel=' + channel,
        dataType: 'jsonp',
        success: function (channel) {
            $('.stream-active').addClass('stream').removeClass('stream-active');
            $('#image' + channel["streams"][0]["channel"]["name"]).addClass("stream-active");
            topStream(channel["streams"][0], 1);
        }, error: function () {
            console.log("Błąd z działaniem funkcji");
        }
    });
}
