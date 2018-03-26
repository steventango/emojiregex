# EmojiRegex

EmojiRejex asynchronously generates a regular expression for Emoji. The regex is generated at runtime from the latest [Unicode Technical Report #51](http://unicode.org/Public/emoji/latest/emoji-data.txt) data. EmojiRegex uses [httpsify](https://httpsify.xeodou.me/) to bypass Mixed Content blocking. Therefore, EmojiRegex will always be up to date. 😊

## Installation

```html
<script src="emojiregex.min.js"></script>
```

## Usage
  ```js
emojiRegex.then(regex => {
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
    //false
    //NUMBER SIGN(#), ASTERISK(*), and DIGIT ZERO..DIGIT NINE(0-9) are part of the standard,
    //however they have been excluded. To include (#), (*), (0-9) delete line 26 of emojiregex.js
 })
 //emojiRegex is a Promise that returns a RegExp object
```
