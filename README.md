![](https://badgen.net/badge/Editor.js/v2.0/blue)

# Quote Tool

Provides Quote Blocks for the [Editor.js](https://editorjs.io).

![](assets/68747470733a2f2f636170656c6c612e706963732f30313764636134362d363836392d343063622d393361302d3939343431363537366533332e6a7067.jpeg)

## Installation

Get the package

```shell
yarn add @editorjs/quote
```

Include module at your application

```javascript
import Quote from '@editorjs/quote';
```

Optionally, you can load this tool from CDN [JsDelivr CDN](https://www.jsdelivr.com/package/npm/@editorjs/quote).

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    quote: Quote,
  },

  ...
});
```

Or init Quote Tool with additional settings

```javascript
var editor = EditorJS({
  ...

  tools: {
    ...
    quote: {
      class: Quote,
      inlineToolbar: true,
      shortcut: 'CMD+SHIFT+O',
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
| ------------------ | -------- | ----------------------------|
| quotePlaceholder   | `string` | quote's placeholder string  |
| captionPlaceholder | `string` | caption's placeholder string|

## Tool's settings

![](https://capella.pics/0db5d4de-c431-4cc2-90bf-bb1f4feec5df.jpg)

You can choose alignment for the quote. It takes no effect while editing, but saved the «alignment» param.

## Output data

| Field     | Type     | Description          |
| --------- | -------- | -------------------- |
| text      | `string` | quote's text         |
| caption   | `string` | caption or an author |
| alignment | `string` | `left` or `center`   |


```json
{
    "type" : "quote",
    "data" : {
        "text" : "The unexamined life is not worth living.",
        "caption" : "Socrates",
        "alignment" : "left"
    }
}
```
