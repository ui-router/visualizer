"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var keysAndValues_1 = require("./keysAndValues");
var TransSummary = (function (_super) {
    __extends(TransSummary, _super);
    function TransSummary() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransSummary.prototype.render = function () {
        return (preact_1.h("table", { className: "summary" },
            preact_1.h("tbody", null,
                preact_1.h("tr", null,
                    preact_1.h("td", null, "From State:"),
                    preact_1.h("td", null, this.props.trans.from().name || '(root)')),
                preact_1.h("tr", null,
                    preact_1.h("td", null, "To State:"),
                    preact_1.h("td", null, this.props.trans.to().name || '(root)')),
                preact_1.h("tr", null,
                    preact_1.h("td", { colSpan: 1 }, "Parameters:"),
                    preact_1.h("td", { colSpan: 1 },
                        preact_1.h(keysAndValues_1.KeysAndValues, { data: this.props.trans.params(), labels: { section: '', modalTitle: 'Parameter value: ' }, classes: { outerdiv: '', keyvaldiv: 'keyvalue', section: '', _key: '', value: '' } }))),
                preact_1.h("tr", null,
                    preact_1.h("td", null, "Outcome:"),
                    preact_1.h("td", null,
                        this.props.status,
                        this.props.rejection
                            ? preact_1.h("span", null,
                                ": ",
                                this.props.rejection)
                            : null)))));
    };
    return TransSummary;
}(preact_1.Component));
exports.TransSummary = TransSummary;
//# sourceMappingURL=transSummary.js.map