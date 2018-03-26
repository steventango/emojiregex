var emojiRegex = fetch('https://httpsify.xeodou.me/url?redirect=http://www.unicode.org/Public/emoji/latest/emoji-data.txt') //bypass Mixed Content
  .then(response => response.text())
  .then(data => {
      var pattern = '';
      data = data.replace(/^#.*?\n/gm, '').replace(/;.*?\n/gm, '||').replace(/\n/gm, '');
      var unicode = data.split('||');
      unicode.pop();
      unicode.forEach((code, index) => {
        code = code.trim();
        switch (code.length) {
          case 4:
          case 5:
            pattern += `\\u{${code}}`;
            break;
          case 10:
          case 12:
            var codes = code.split('..');
            pattern += `[\\u{${codes[0]}}-\\u{${codes[1]}}]`;
            break;
        }
        if (index < unicode.length - 1) {
          pattern += '|';
        }
      });
      //Disincludes NUMBER SIGN(#), ASTERISK(*), and DIGIT ZERO..DIGIT NINE(0-9)
      pattern = pattern.replace(/\\\u\{0023\}\|\\\u\{002A\}\|\[\\\u\{0030\}\-\\\u\{0039\}\]\|/g, '');
      return new RegExp(pattern, 'u');
  }).catch(e => {
  console.error('EmojiRegex initialization error: ' + e);
});
