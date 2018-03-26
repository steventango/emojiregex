# EmojiRegex

EmojiRejex asynchronously generates a regular expression for Emoji. At runtime the regex is generated from the latest [Unicode Technical Report #51](http://unicode.org/Public/emoji/latest/emoji-data.txt) data. EmojiRegex uses [httpsify](https://httpsify.xeodou.me/) to bypass Mixed Content blocking. Therefore, EmojiRegex will always match the most up to date Emojis. 😊

## Installation

```html
<script src="emojiregex.min.js"></script>
```

## Usage
  ```js
emojiRegex()
  .then(regex => {
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
    //they are excluded. To include (#), (*), (0-9) comment out line 25 of emojiregex.js
 }) //returns a Promise that returns a RegExp object

```
