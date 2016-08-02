# EmojiRegex
Emoji Regex offers a regular expression to match all emoji symbols according to the Unicode Standard.

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
//true);
```
