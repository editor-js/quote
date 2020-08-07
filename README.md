![](https://badgen.net/badge/@Editorjs-quote/v2.0/blue)   [![](https://data.jsdelivr.com/v1/package/npm/@itech-indrustries/quote/badge)](https://www.jsdelivr.com/package/npm/@itech-indrustries/quote)

# Quote Tool

Provides Quote Blocks for the [Editor.js](https://editorjs.io).

![Screenshot from 2020-08-07 13-59-58](https://user-images.githubusercontent.com/55910733/89626003-5a5e5300-d8b6-11ea-8e55-866de73e1911.png)

## Installation

### Install via NPM

Get the package

```shell
npm i @itech-indrustries/quote
```

Include module at your application

```javascript
const Quote = require('@itech-indrustries/quote');
```

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@itech-indrustries/quote).

`https://cdn.jsdelivr.net/npm/@itech-indrustries/quote@latest`

Then require this script on page with Editor.js.

```html
<script src="https://cdn.jsdelivr.net/npm/@itech-indrustries/quote@latest"></script>
```

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
