# jsdom-add-files

Adds local files to a HTML file input in jsdom and fires the `change` event. Inspired by jsdom ticket [#1272](https://github.com/jsdom/jsdom/issues/1272)

## Install

```bash
npm install --save jsdom-add-files
```

## Usage

```js
var jsdomAddFiles = require('jsdom-add-files');

// get file input
var fileInput = document.querySelector('input[type="file"]');

// add files (automatically fires onchange event)
jsdomAddFiles(fileInput, [
    path.join(__dirname, 'file1.jpg'),
    path.join(__dirname, 'file2.jpp')
]);
```

## Star the repo

Please star the repo if you find this useful as it helps me priorities open source fixes

## History

For change-log, check [releases](https://github.com/john-doherty/jsdom-add-files/releases).

## License

Licensed under [MIT License](LICENSE) &copy; [John Doherty](https://twitter.com/mrjohndoherty)