function emojiRegex() {
    var regex, pattern = '',
        unicode = [];

    function convert(s) {
        s = parseInt(s, 16);

        if (s >= 0x10000 && s <= 0x10FFFF) {
            var hi = Math.floor((s - 0x10000) / 0x400) + 0xD800;
            var lo = ((s - 0x10000) % 0x400) + 0xDC00;
            return [hi.toString(16).toUpperCase(), lo.toString(16).toUpperCase()];
        } else {
            return false;
        }
    }
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "https://31e7928180bdcb372167bf95d59adf8333a5c2b6.googledrive.com/host/0B9Tx83SPVgPNZjlHeHJEQVZOa0U/emoji-data.txt", false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                var allText = rawFile.responseText;
                allText = allText.replace(/^#.*?\n/gm, '');
                allText = allText.replace(/;.*?\n/gm, '||');
                allText = allText.replace(/\n/gm, '');
                unicode = allText.split("||");
                unicode.pop();
                for (var i = 0; i < unicode.length; i++) {
                    unicode[i] = unicode[i].trim();
                }
                pattern += '(?:\\u0023|\\u002A|[\\u0030-\\u0039])'; //Disincludes NUMBER SIGN(#), ASTERISK(*), and DIGIT ZERO..DIGIT NINE(0-9)
                for (i = 0; i < unicode.length; i++) {
                    if (unicode[i].length === 4) {
                        pattern += '\\u' + unicode[i];
                    } else if (unicode[i].length === 5) {
                        var surrogates = convert(unicode[i]);
                        pattern += '\\u' + surrogates[0] + '\\u' + surrogates[1];
                    } else if (unicode[i].length === 10) {
                        var arr = unicode[i].split('..');
                        pattern += '[' + '\\u' + arr[0] + '-' + '\\u' + arr[1] + ']';
                    } else {
                        var arra = unicode[i].split('..');
                        var surrogatei = convert(arra[0]);
                        var surrogateii = convert(arra[1]);
                        pattern += '\\u' + surrogatei[0] + '[' + '\\u' + surrogatei[1] + '-' + '\\u' + surrogateii[1] + ']';
                    }
                    if (i < unicode.length - 1) {
                        pattern += '|';
                    }
                }
                regex = new RegExp(pattern, 'gmi');
            }
        }
    };
    rawFile.send();
    return regex;
}
