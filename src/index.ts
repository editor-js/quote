/**
 * Build styles
 */
import "./index.css";

import { IconAlignLeft, IconAlignCenter, IconQuote } from "@codexteam/icons";
import { make } from "@editorjs/dom";
import type { API, BlockAPI, BlockTool, ToolConfig } from "@editorjs/editorjs";
import { MenuConfig } from "@editorjs/editorjs/types/tools";

/**
 * @typedef {object} QuoteConfig
 * @description Quote Tool`s initial configuration
 * @property {string} quotePlaceholder - placeholder to show in quote`s text input
 * @property {string} captionPlaceholder - placeholder to show in quote`s caption input
 * @property {'center'|'left'} defaultAlignment - alignment to use as default
 */
export interface QuoteConfig extends ToolConfig {
  /**
   * Placeholder text to display in the quote's text input.
   */
  quotePlaceholder: string;

  /**
   * Placeholder text to display in the quote's caption input.
   */
  captionPlaceholder: string;

  /**
   * Default alignment for the quote.
   */
  defaultAlignment: Alignment;
}

/**
 * @typedef {object} QuoteData
 * @description Quote Tool`s input and output data
 * @property {string} text - quote`s text
 * @property {string} caption - quote`s caption
 * @property {'center'|'left'} alignment - quote`s alignment
 */
export interface QuoteData {
  /**
   * The text of the quote.
   */
  text: string;

  /**
   * The caption for the quote.
   */
  caption: string;

  /**
   * The alignment of the quote.
   */
  alignment: Alignment;
}

/**
 * @typedef {object} QuoteParams
 * @description Constructor params for the Quote tool, use to pass initial data and settings
 * @property {QuoteData} data - Preload data for the quote.
 * @property {QuoteConfig} config - The configuration for the quote.
 * @property {API} api - The Editor.js API.
 * @property {boolean} readOnly - Is quote is read-only.
 * @property {BlockAPI} block - BlockAPI object of Quote.
 */
interface QuoteParams {
  /**
   * Initial data for the quote
   */
  data: QuoteData;
  /**
   * Quote tool configuration
   */
  config: QuoteConfig;
  /**
   * Editor.js API
   */
  api: API;
  /**
   * Is quote read-only.
   */
  readOnly: boolean;
  /**
   * BlockAPI object of Quote.
   */
  block: BlockAPI;
}

/**
 * @typedef {object} QuoteCSS
 * @description CSS classes names
 * @property {string} block - Editor.js CSS Class for block
 * @property {string} wrapper - Quote CSS Class
 */
interface QuoteCSS {
  /**
   * Editor.js CSS Class for block
   */
  baseClass: string;
  /**
   * Quote CSS Class
   */
  wrapper: string;
  /**
   * Quote CSS Class
   */
  input: string;
  /**
   * Quote CSS Class
   */
  text: string;
  /**
   * Quote CSS Class
   */
  caption: string;
}

/**
 * @typedef {Enum} Alignment
 * @description Enum for Quote Alignment
 */
enum Alignment {
  Left = "left",
  Center = "center",
}

/**
 * @class Quote
 * @classdesc Quote Tool for Editor.js
 * @property {QuoteData} data - Tool`s input and output data
 * @propert {API} api - Editor.js API instance
 */
export default class Quote implements BlockTool {
  /**
   * The Editor.js API
   */
  api: API;
  /**
   * Is Quote Tool read-only
   */
  readOnly: boolean;

  /**
   * Placeholder for Quote Tool
   */
  private _quotePlaceholder: string;

  /**
   * Current quote element
   */
  private _block: BlockAPI;
  /**
   * Caption placeholder for Quote Tool
   */
  private _captionPlaceholder: string;
  /**
   * Quote's data
   */
  private _data: QuoteData;
  /**
   * Quote Tool's CSS classes
   */
  private _CSS: QuoteCSS;

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {object} params - constructor params
   * @param {QuoteData} params.data - previously saved data
   * @param {QuoteConfig} params.config - user config for Tool
   * @param {API} params.api - editor.js api
   * @param {boolean} params.readOnly - read only mode flag
   */
  constructor({ data, config, api, readOnly, block }: QuoteParams) {
    const { DEFAULT_ALIGNMENT } = Quote;

    this.api = api;
    this.readOnly = readOnly;

    this._quotePlaceholder =
      config.quotePlaceholder || Quote.DEFAULT_QUOTE_PLACEHOLDER;
    this._captionPlaceholder =
      config.captionPlaceholder || Quote.DEFAULT_CAPTION_PLACEHOLDER;

    this._data = {
      text: data.text || "",
      caption: data.caption || "",
      alignment:
        (Object.values(Alignment).includes(data.alignment as Alignment) &&
          data.alignment) ||
        config.defaultAlignment ||
        DEFAULT_ALIGNMENT,
    };
    this._CSS = {
      baseClass: this.api.styles.block,
      wrapper: "cdx-quote",
      text: "cdx-quote__text",
      input: this.api.styles.input,
      caption: "cdx-quote__caption",
    };
    this._block = block;
  }

  /**
   * Notify core that read-only mode is supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported(): boolean {
    return true;
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox(): { icon: string; title: "Quote" } {
    return {
      icon: IconQuote,
      title: "Quote",
    };
  }

  /**
   * Empty Quote is not empty Block
   *
   * @public
   * @returns {boolean}
   */
  static get contentless(): boolean {
    return true;
  }

  /**
   * Allow to press Enter inside the Quote
   *
   * @public
   * @returns {boolean}
   */
  static get enableLineBreaks(): boolean {
    return true;
  }

  /**
   * Default placeholder for quote text
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_QUOTE_PLACEHOLDER(): string {
    return "Enter a quote";
  }

  /**
   * Default placeholder for quote caption
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_CAPTION_PLACEHOLDER(): string {
    return "Enter a caption";
  }


  /**
   * Default quote alignment
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_ALIGNMENT(): Alignment {
    return Alignment.Left;
  }

  /**
   * Allow Quote to be converted to/from other blocks
   */
  static get conversionConfig() {
    return {
      /**
       * To create Quote data from string, simple fill 'text' property
       */
      import: "text",
      /**
       * To create string from Quote data, concatenate text and caption
       *
       * @param {QuoteData} quoteData
       * @returns {string}
       */
      export: function (quoteData: QuoteData): string {
        return quoteData.caption
          ? `${quoteData.text} — ${quoteData.caption}`
          : quoteData.text;
      },
    };
  }

  /**
   * Tool`s styles
   *
   * @returns {QuoteCSS}
   */
  get CSS(): QuoteCSS {
    return {
      baseClass: this.api.styles.block,
      wrapper: "cdx-quote",
      text: "cdx-quote__text",
      input: this.api.styles.input,
      caption: "cdx-quote__caption",
    };
  }

  /**
   * Tool`s settings properties
   *
   * @returns {*[]}
   */
  get settings(): { name: Alignment; icon: string }[] {
    return [
      {
        name: Alignment.Left,
        icon: IconAlignLeft,
      },
      {
        name: Alignment.Center,
        icon: IconAlignCenter,
      },
    ];
  }

  /**
   * Create Quote Tool container with inputs
   *
   * @returns {Element}
   */
  render(): HTMLElement {
    const container = make("blockquote", [
      this._CSS.baseClass,
      this._CSS.wrapper,
    ]);
    const quote = make("div", [this._CSS.input, this._CSS.text], {
      contentEditable: !this.readOnly,
      innerHTML: this._data.text,
    });
    const caption = make("div", [this._CSS.input, this._CSS.caption], {
      contentEditable: !this.readOnly,
      innerHTML: this._data.caption,
    });

    quote.dataset.placeholder = this._quotePlaceholder;
    caption.dataset.placeholder = this._captionPlaceholder;

    container.appendChild(quote);
    container.appendChild(caption);
    return container;
  }

  /**
   * Extract Quote data from Quote Tool element
   *
   * @param {HTMLDivElement} quoteElement - element to save
   * @returns {QuoteData}
   */
  save(quoteElement: HTMLDivElement): QuoteData {
    const text = quoteElement.querySelector(`.${this._CSS.text}`);
    const caption = quoteElement.querySelector(`.${this._CSS.caption}`);

    return Object.assign(this._data, {
      text: text?.innerHTML ?? "",
      caption: caption?.innerHTML ?? "",
    });
  }

  /**
   * Sanitizer rules
   */
  static get sanitize() {
    return {
      text: {
        br: true,
      },
      caption: {
        br: true,
      },
      alignment: {},
    };
  }

  /**
   * Create wrapper for Tool`s settings buttons:
   * 1. Left alignment
   * 2. Center alignment
   *
   * @returns {MenuConfig}
   *
   */
  renderSettings(): HTMLElement | MenuConfig {
    const capitalize = (str: string) =>
      str ? str[0].toUpperCase() + str.slice(1) : str;

    return this.settings.map((item) => ({
      icon: item.icon,
      label: this.api.i18n.t(`Align ${capitalize(item.name)}`),
      onActivate: () => this._toggleTune(item.name),
      isActive: this._data.alignment === item.name,
      closeOnActivate: true,
    }));
  }

  /**
   * Toggle quote`s alignment
   *
   * @param {string} tune - alignment
   * @private
   */
  _toggleTune(tune: Alignment) {
    this._data.alignment = tune;

    // Dispatch change if quoteElement already exists
      this._block.dispatchChange();
  }
}
