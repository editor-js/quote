![](https://badgen.net/badge/CodeX%20Editor/v2.0/blue)

# Quote Tool

Provides Quote Blocks for the [CodeX Editor](https://ifmo.su/editor).

![](https://capella.pics/017dca46-6869-40cb-93a0-994416576e33.jpg)

## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev codex.editor.quote
```

Include module at your application

```javascript
const Quote = require('codex.editor.quote');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

### Load from CDN

Get newest bundle path from [RawGit](https://rawgit.com) — open site and paste link to JS bundle in repository.

`https://github.com/codex-editor/quote/blob/master/dist/bundle.js`

> Note: use `production` link with commit hash to avoid issues with caching.

Then require this script on page with CodeX Editor.

```html
<script src="..."></script>
```

## Usage

Add a new Tool to the `tools` property of the CodeX Editor initial config.

```javascript
var editor = CodexEditor({
  ...
  
  tools: {
    ...
    quote: {
      class: Quote,
      inlineToolbar: true,
      config: {
        quotePlaceholder: 'Enter a quote',
        captionPlaceholder: 'Quote\'s author',
      },
    },
  },
  
  ...
});
```

## Config Params

| Field              | Type     | Description                 |
| ------------------ | -------- | --------------------------- |
| quotePlaceholder   | `string` | header's placeholder string |
| captionPlaceholder | `string` | header's placeholder string |

## Tool's settings

![](https://capella.pics/0db5d4de-c431-4cc2-90bf-bb1f4feec5df.jpg)

You can choose alignment for the quote. It takes no effect while editing, but saved the «alignment» param.

## Output data

| Field     | Type     | Description          |
| --------- | -------- | -------------------- |
| quote     | `string` | quote's text         |
| caption   | `string` | caption or an author |
| alignment | `string` | `left` or `center`   |


```json
{
    "type" : "quote",
    "data" : {
        "quote" : "The unexamined life is not worth living.",
        "caption" : "Socrates",
        "alignment" : "left"
    }
}
```
