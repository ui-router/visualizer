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
var popoverHeading_1 = require("./popoverHeading");
var transSummary_1 = require("./transSummary");
var nodePaths_1 = require("./nodePaths");
var TransitionPopover = (function (_super) {
    __extends(TransitionPopover, _super);
    function TransitionPopover() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TransitionPopover.prototype.render = function () {
        var _this = this;
        if (!this.props.open && !this.props.pinned)
            return null;
        var classes = function () { return "transitionDetail uir-panel panel-default " +
            (_this.props.pinned ? "pin " : "") +
            (_this.props.expanded ? "expand " : "") +
            (_this.props.open ? "showDetail " : ""); };
        return (preact_1.h("div", { className: classes() },
            preact_1.h(popoverHeading_1.PopoverHeading, { transition: this.props.transition, pinned: this.props.pinned, expanded: this.props.expanded, togglePinned: this.props.togglePinned, toggleExpand: this.props.toggleExpand }),
            preact_1.h("div", { className: "uir-panel-body" },
                preact_1.h(transSummary_1.TransSummary, { trans: this.props.transition, status: this.props.status, rejection: this.props.rejection }),
                preact_1.h("hr", null),
                preact_1.h(nodePaths_1.NodePaths, { transition: this.props.transition })),
            preact_1.h("div", { className: "downArrow" })));
    };
    return TransitionPopover;
}(preact_1.Component));
exports.TransitionPopover = TransitionPopover;
//# sourceMappingURL=transitionPopover.js.map