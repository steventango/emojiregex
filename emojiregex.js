const emojiRegex = fetch('https://raw.githubusercontent.com/steventango/emojiregex/master/emoji-data.txt')
  .then(response => response.text())
  .then(data => {
    let pattern = [];
    const unicode = data.replace(/^#.*?\n/gm, '').replace(/;.*?\n/gm, '||').replace(/\n/gm, '').split('||');
    unicode.pop();
    unicode.forEach(code => {
      code = code.trim();
      switch (code.length) {
        case 4:
        case 5:
          pattern.push(`\\u{${code}}`);
          break;
        case 10:
        case 12:
          var codes = code.split('..');
          pattern.push(`[\\u{${codes[0]}}-\\u{${codes[1]}}]`);
          break;
      }
    });
    pattern = pattern.join('|');
    //Disincludes NUMBER SIGN(#), ASTERISK(*), and DIGIT ZERO..DIGIT NINE(0-9)
    pattern = pattern.replace(/\\\u\{0023\}\|\\\u\{002A\}\|\[\\\u\{0030\}-\\\u\{0039\}\]\|/g, '');
    return new RegExp(pattern, 'u');
  }).catch(e => console.error(e));
