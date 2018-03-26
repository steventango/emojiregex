# EmojiRegex

EmojiRejex generates a regular expression based on the data from [Unicode Technical Report #51](http://unicode.org/Public/emoji/latest/emoji-data.txt). EmojiRegex also uses [httpsify](https://httpsify.xeodou.me/), which allows it to convert unicode's non-https page to a https page. Thus, EmojiRegex will always be up to date, and no human interaction is required to update it.

#Installation:

```html
<script src="emojiregex.min.js"></script>
```

#Usage:
  ```js
var flags = 'gmi'
emojiRegex()
  .then(regex => {
    regex(flags).test('😂');
    //true
    regex(flags).test('💩');
    //true
    regex(flags).test('🇨🇦');
    //true
    regex(flags).test('A');
    //false
    regex(flags).test('1');
    regex(flags).test('#');
    regex(flags).test('*');
    //false, even though NUMBER SIGN(#), ASTERISK(*), and DIGIT ZERO..DIGIT NINE(0-9) are part of the standard,
    //they are excluded. To include (#), (*), (0-9) comment out line 63 of emojiregex.js
 }) //returns a Promise with a value that is a Function that returns a Regex.

```
