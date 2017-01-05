var emojiRegex;
(function createEmojiRegex() {
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
    var regex, allText, pattern = '';
    var workercode = new Blob(['(',
        self.onmessage = function() {
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", "https://httpsify.xeodou.me/url?redirect=http://www.unicode.org/Public/emoji/latest/emoji-data.txt", false); //uses httpsify.xeodou.me to httpsify Unicode's http emoji-data.txt
            rawFile.onreadystatechange = function() {
                if (rawFile.readyState === 4) {
                    if (rawFile.status === 200 || rawFile.status === 0) {
                        var allText = rawFile.responseText;
                        self.postMessage(allText);
                    }
                }
            };
            rawFile.send();
        }.toString() + ')()'
    ], {
        type: 'application/javascript'
    });
    var worker = new Worker(window.URL.createObjectURL(workercode));
    worker.postMessage("");
    worker.onmessage = function(e) {
        allText = e.data;
        allText = allText.replace(/^#.*?\n/gm, '');
        allText = allText.replace(/;.*?\n/gm, '||');
        allText = allText.replace(/\n/gm, '');
        unicode = allText.split("||");
        unicode.pop();
        for (var i = 0; i < unicode.length; i++) {
            unicode[i] = unicode[i].trim();
        }
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
		//Disincludes NUMBER SIGN(#), ASTERISK(*), and DIGIT ZERO..DIGIT NINE(0-9)
		pattern = pattern.replace('\\u0023|\\u002A|[\\u0030-\\u0039]|','');
        emojiRegex = function(flags) {
			regex = new RegExp(pattern, flags);
            return regex;
        };
    };
})();
