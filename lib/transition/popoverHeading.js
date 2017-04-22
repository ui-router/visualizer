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
var PopoverHeading = (function (_super) {
    __extends(PopoverHeading, _super);
    function PopoverHeading() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopoverHeading.prototype.render = function () {
        var _this = this;
        var tackClass = function () { return "uir-icon uir-icon-thumb-tack " + (_this.props.pinned ? "" : "uir-rotate-35"); };
        var expandClass = function () { return "uir-icon tooltip-right " + (_this.props.expanded ? "uir-icon-toggle-on" : "uir-icon-toggle-off"); };
        return (preact_1.h("div", { className: "uir-panel-heading uir-header" },
            preact_1.h("div", { style: { cursor: "pointer" }, onClick: this.props.togglePinned },
                preact_1.h("i", { className: tackClass() })),
            preact_1.h("h3", { className: "uir-panel-title" },
                "Transition #",
                this.props.transition.$id),
            preact_1.h("div", { style: { cursor: "pointer" }, onClick: this.props.toggleExpand },
                preact_1.h("i", { className: expandClass() }))));
    };
    return PopoverHeading;
}(preact_1.Component));
exports.PopoverHeading = PopoverHeading;
//# sourceMappingURL=popoverHeading.js.map