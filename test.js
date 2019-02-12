var player_data = { "flag": "play", "encrypt": 2, "trysee": 0, "points": 0, "link":
"\/vod-play-id-87-sid-1-nid-1.html", "link_next": "\/vod-play-id-87-sid-1-nid-17.html", "link_pre":
"\/vod-play-id-87-sid-1-nid-15.html", "url":
"JTREJTUzJTMwJTc4JTRGJTQ0JTREJTc5JTRGJTQ0JTQ1JTc5JTREJTQ0JTQ1JTM1JTRGJTQxJTNEJTNE", "url_next":
"JTREJTUzJTMwJTc4JTRGJTQ0JTREJTc5JTRGJTQ0JTYzJTc5JTREJTdBJTREJTMyJTRGJTQxJTNEJTNE", "from": "ksyun",
"server": "no",
"note": "" }


var base64DecodeChars = new Array( - 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while ( i < len && c1 == - 1 );
        if (c1 == -1) break;
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
        } while ( i < len && c2 == - 1 );
        if (c2 == -1) break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61) return out;
            c3 = base64DecodeChars[c3]
        } while ( i < len && c3 == - 1 );
        if (c3 == -1) break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61) return out;
            c4 = base64DecodeChars[c4]
        } while ( i < len && c4 == - 1 );
        if (c4 == -1) break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
    }
    return out
}
var MacPlayer = {
    'Init': function() {
        if (player_data.encrypt == '1') {
            player_data.url = unescape(player_data.url);
            player_data.url_next = unescape(player_data.url_next)
        } else if (player_data.encrypt == '2') {
            player_data.url = unescape(base64decode(player_data.url));
            player_data.url_next = unescape(base64decode(player_data.url_next))
        }
        this.PlayUrl = player_data.url;
        this.PlayUrlNext = player_data.url_next;
        this.PlayLinkNext = player_data.link_next;
        this.PlayLinkPre = player_data.link_pre;
    }
};
MacPlayer.Init();
function a(){
    return MacPlayer.PlayUrl
}