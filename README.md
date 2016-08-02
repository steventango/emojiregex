# EmojiRegex
Emoji Regex generates a regular expression to match all emoji symbols according to the Unicode Standard.

EmojiRejex() generates a regular expression based on the data from Unicode Technical Report #51. Because of this, the regular expression is always up to date, and will self update whenever new emoji are added to the Unicode standard.

#Installation:
Browser:

```html
<script src="emojiregex.js"></script>
```
or 
```html
<script src="emojiregex.min.js"></script>
```

#Usage:
  ```js
var regex = emojiRegex();
//returns regex
regex.test('😂')
//true
regex.test('💩');
//true
regex.test('🇨🇦');
//true
regex.test('A');
//false
regex.test('1');
//false, even though NUMBER SIGN(#), ASTERISK(*), and DIGIT ZERO..DIGIT NINE(0-9) are part of the standard,
//they are disincluded. To include (#), (*), (0-9) comment out line 31 of emojiregex.js
```
