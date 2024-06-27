import "./index.css";
import { IconAlignLeft, IconAlignCenter, IconQuote } from "@codexteam/icons";
import { QuoteData, QuoteConfig, TunesMenuConfig } from "./types";

export default class Quote {
  private api: any;
  private readOnly: boolean;
  private quotePlaceholder: string;
  private captionPlaceholder: string;
  private data: QuoteData;

  constructor({ data, config, api, readOnly }: { data: QuoteData; config: QuoteConfig; api: any; readOnly: boolean }) {
    const { ALIGNMENTS, DEFAULT_ALIGNMENT } = Quote;

    this.api = api;
    this.readOnly = readOnly;

    this.quotePlaceholder = config.quotePlaceholder || Quote.DEFAULT_QUOTE_PLACEHOLDER;
    this.captionPlaceholder = config.captionPlaceholder || Quote.DEFAULT_CAPTION_PLACEHOLDER;

    this.data = {
      text: data.text || "",
      caption: data.caption || "",
      alignment: Object.values(ALIGNMENTS).includes(data.alignment) ? data.alignment : config.defaultAlignment || DEFAULT_ALIGNMENT,
    } as QuoteData;
  }

  static get isReadOnlySupported(): boolean {
    return true;
  }

  static get toolbox(): { icon: string; title: string } {
    return {
      icon: IconQuote,
      title: "Quote",
    };
  }

  static get contentless(): boolean {
    return true;
  }

  static get enableLineBreaks(): boolean {
    return true;
  }

  static get DEFAULT_QUOTE_PLACEHOLDER(): string {
    return "Enter a quote";
  }

  static get DEFAULT_CAPTION_PLACEHOLDER(): string {
    return "Enter a caption";
  }

  static get ALIGNMENTS(): { left: string; center: string } {
    return {
      left: "left",
      center: "center",
    };
  }

  static get DEFAULT_ALIGNMENT(): string {
    return Quote.ALIGNMENTS.left;
  }

  static get conversionConfig() {
    return {
      import: "text",
      export: function (quoteData: QuoteData): string {
        return quoteData.caption ? `${quoteData.text} — ${quoteData.caption}` : quoteData.text;
      },
    };
  }

  get CSS() {
    return {
      baseClass: this.api.styles.block,
      wrapper: "cdx-quote",
      text: "cdx-quote__text",
      input: this.api.styles.input,
      caption: "cdx-quote__caption",
    };
  }

  get settings() {
    return [
      {
        name: "left",
        icon: IconAlignLeft,
      },
      {
        name: "center",
        icon: IconAlignCenter,
      },
    ];
  }

  render(): HTMLElement {
    const container = this._make("blockquote", [this.CSS.baseClass, this.CSS.wrapper]);
    const quote = this._make("div", [this.CSS.input, this.CSS.text], {
      contentEditable: (!this.readOnly).toString(),
      innerHTML: this.data.text,
    });
    const caption = this._make("div", [this.CSS.input, this.CSS.caption], {
      contentEditable: (!this.readOnly).toString(),
      innerHTML: this.data.caption,
    });

    quote.dataset.placeholder = this.quotePlaceholder;
    caption.dataset.placeholder = this.captionPlaceholder;

    container.appendChild(quote);
    container.appendChild(caption);

    return container;
  }

  save(quoteElement: HTMLElement): QuoteData {
    const text = quoteElement.querySelector(`.${this.CSS.text}`) as HTMLDivElement;
    const caption = quoteElement.querySelector(`.${this.CSS.caption}`) as HTMLDivElement;

    return Object.assign(this.data, {
      text: text.innerHTML,
      caption: caption.innerHTML,
    });
  }

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

  renderSettings(): TunesMenuConfig[] {
    const capitalize = (str: string) => str[0].toUpperCase() + str.substr(1);

    return this.settings.map((item) => ({
      icon: item.icon,
      label: this.api.i18n.t(`Align ${capitalize(item.name)}`),
      onActivate: () => this._toggleTune(item.name as "center" | "left"),
      isActive: this.data.alignment === item.name,
      closeOnActivate: true,
    }));
  }

  private _toggleTune(tune: "center" | "left") {
    this.data.alignment = tune;
  }

  private _make<K extends keyof HTMLElementTagNameMap>(tagName: K, classNames: string | string[] = [], attributes: { [key: string]: string } = {}): HTMLElementTagNameMap[K] {
    const el = document.createElement(tagName) as HTMLElementTagNameMap[K];

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (const attrName in attributes) {
      (el as any)[attrName] = attributes[attrName];
    }

    return el;
  }
}
