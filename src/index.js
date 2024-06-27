"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.css");
var icons_1 = require("@codexteam/icons");
var Quote = /** @class */ (function () {
    function Quote(_a) {
        var data = _a.data, config = _a.config, api = _a.api, readOnly = _a.readOnly;
        var ALIGNMENTS = Quote.ALIGNMENTS, DEFAULT_ALIGNMENT = Quote.DEFAULT_ALIGNMENT;
        this.api = api;
        this.readOnly = readOnly;
        this.quotePlaceholder = config.quotePlaceholder || Quote.DEFAULT_QUOTE_PLACEHOLDER;
        this.captionPlaceholder = config.captionPlaceholder || Quote.DEFAULT_CAPTION_PLACEHOLDER;
        this.data = {
            text: data.text || "",
            caption: data.caption || "",
            alignment: Object.values(ALIGNMENTS).includes(data.alignment) ? data.alignment : config.defaultAlignment || DEFAULT_ALIGNMENT,
        };
    }
    Object.defineProperty(Quote, "isReadOnlySupported", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Quote, "toolbox", {
        get: function () {
            return {
                icon: icons_1.IconQuote,
                title: "Quote",
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Quote, "contentless", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Quote, "enableLineBreaks", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Quote, "DEFAULT_QUOTE_PLACEHOLDER", {
        get: function () {
            return "Enter a quote";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Quote, "DEFAULT_CAPTION_PLACEHOLDER", {
        get: function () {
            return "Enter a caption";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Quote, "ALIGNMENTS", {
        get: function () {
            return {
                left: "left",
                center: "center",
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Quote, "DEFAULT_ALIGNMENT", {
        get: function () {
            return Quote.ALIGNMENTS.left;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Quote, "conversionConfig", {
        get: function () {
            return {
                import: "text",
                export: function (quoteData) {
                    return quoteData.caption ? "".concat(quoteData.text, " \u2014 ").concat(quoteData.caption) : quoteData.text;
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Quote.prototype, "CSS", {
        get: function () {
            return {
                baseClass: this.api.styles.block,
                wrapper: "cdx-quote",
                text: "cdx-quote__text",
                input: this.api.styles.input,
                caption: "cdx-quote__caption",
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Quote.prototype, "settings", {
        get: function () {
            return [
                {
                    name: "left",
                    icon: icons_1.IconAlignLeft,
                },
                {
                    name: "center",
                    icon: icons_1.IconAlignCenter,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    Quote.prototype.render = function () {
        var container = this._make("blockquote", [this.CSS.baseClass, this.CSS.wrapper]);
        var quote = this._make("div", [this.CSS.input, this.CSS.text], {
            contentEditable: !this.readOnly ? "true" : "false",
            innerHTML: this.data.text,
        });
        var caption = this._make("div", [this.CSS.input, this.CSS.caption], {
            contentEditable: !this.readOnly ? "true" : "false",
            innerHTML: this.data.caption,
        });
        quote.dataset.placeholder = this.quotePlaceholder;
        caption.dataset.placeholder = this.captionPlaceholder;
        container.appendChild(quote);
        container.appendChild(caption);
        return container;
    };
    Quote.prototype.save = function (quoteElement) {
        var text = quoteElement.querySelector(".".concat(this.CSS.text));
        var caption = quoteElement.querySelector(".".concat(this.CSS.caption));
        return Object.assign(this.data, {
            text: text.innerHTML,
            caption: caption.innerHTML,
        });
    };
    Object.defineProperty(Quote, "sanitize", {
        get: function () {
            return {
                text: {
                    br: true,
                },
                caption: {
                    br: true,
                },
                alignment: {},
            };
        },
        enumerable: false,
        configurable: true
    });
    Quote.prototype.renderSettings = function () {
        var _this = this;
        var capitalize = function (str) { return str[0].toUpperCase() + str.substr(1); };
        return this.settings.map(function (item) { return ({
            icon: item.icon,
            label: _this.api.i18n.t("Align ".concat(capitalize(item.name))),
            onActivate: function () { return _this._toggleTune(item.name); },
            isActive: _this.data.alignment === item.name,
            closeOnActivate: true,
        }); });
    };
    Quote.prototype._toggleTune = function (tune) {
        this.data.alignment = tune;
    };
    Quote.prototype._make = function (tagName, classNames, attributes) {
        var _a;
        if (classNames === void 0) { classNames = []; }
        if (attributes === void 0) { attributes = {}; }
        var el = document.createElement(tagName);
        if (Array.isArray(classNames)) {
            (_a = el.classList).add.apply(_a, classNames);
        }
        else if (classNames) {
            el.classList.add(classNames);
        }
        for (var attrName in attributes) {
            el[attrName] = attributes[attrName];
        }
        return el;
    };
    return Quote;
}());
exports.default = Quote;
