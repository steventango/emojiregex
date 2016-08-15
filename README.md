# EmojiRegex

EmojiRejex generates a regular expression based on the data from [Unicode Technical Report #51](unicode.org/Public/emoji/latest/emoji-data.txt). Because of this, the regular expression is always up to date, and will self update whenever new emoji are added to the Unicode standard.

#Installation:

```html
<script src="emojiregex.js"></script>
```
or 
```html
<script src="emojiregex.min.js"></script>
```

#Usage:
  ```js
var flags = 'gmi'
var regex = emojiRegex(flags);
//returns regex
regex.test('😂');
//true
regex.test('💩');
//true
regex.test('🇨🇦');
//true
regex.test('A');
//false
regex.test('1');
regex.test('#');
regex.test('*');
//false, even though NUMBER SIGN(#), ASTERISK(*), and DIGIT ZERO..DIGIT NINE(0-9) are part of the standard,
//they are excluded. To include (#), (*), (0-9) comment out line 63 of emojiregex.js
```
