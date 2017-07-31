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
var modal_1 = require("../util/modal");
var pretty_1 = require("../util/pretty");
var ResolveData = (function (_super) {
    __extends(ResolveData, _super);
    function ResolveData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close = function () { return _this.props.close(); };
        return _this;
    }
    ResolveData.prototype.render = function () {
        return (preact_1.h("div", null,
            preact_1.h(modal_1.Modal, null,
                preact_1.h("div", { className: "uir-modal-header uir-resolve-header" },
                    preact_1.h("div", { style: { "fontSize": "1.5em" } },
                        this.props.labels.modalTitle,
                        ": ",
                        this.props.id),
                    preact_1.h("button", { className: "btn btn-xs btn-primary", onClick: this.close },
                        preact_1.h("i", { className: "uir-icon uir-iconw-close" }))),
                preact_1.h("div", { className: "uir-modal-body" },
                    preact_1.h(pretty_1.Pretty, { data: this.props.value })),
                preact_1.h("div", { className: "uir-modal-footer" },
                    preact_1.h("button", { className: "btn btn-primary", onClick: this.close }, "Close")))));
    };
    return ResolveData;
}(preact_1.Component));
exports.ResolveData = ResolveData;
//# sourceMappingURL=resolveData.js.map