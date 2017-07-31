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
var BreadcrumbArrow = (function (_super) {
    __extends(BreadcrumbArrow, _super);
    function BreadcrumbArrow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function () {
            return _this.props.toggleExpand();
        };
        return _this;
    }
    BreadcrumbArrow.prototype.iconClass = function () {
        var iconClasses = {
            running: 'uir-icon uir-spin uir-iconw-spinner',
            success: 'uir-icon uir-iconw-check',
            redirected: 'uir-icon uir-iconw-share',
            ignored: 'uir-icon uir-iconw-circle-o',
            error: 'uir-icon uir-iconw-close'
        };
        return iconClasses[this.props.status];
    };
    BreadcrumbArrow.prototype.render = function () {
        return !this.props.transition ? null : (preact_1.h("div", { className: this.props.status + " historyEntry", onClick: this.handleClick },
            preact_1.h("div", { className: "summary" },
                preact_1.h("div", { className: "transid" }, this.props.transition.$id),
                preact_1.h("div", { className: "status" },
                    this.props.status,
                    !this.props.message ? null : preact_1.h("span", null,
                        ": ",
                        this.props.message)),
                preact_1.h("div", { className: "transname" },
                    preact_1.h("i", { className: this.iconClass() }),
                    " ",
                    this.props.transition.to().name))));
    };
    return BreadcrumbArrow;
}(preact_1.Component));
exports.BreadcrumbArrow = BreadcrumbArrow;
//# sourceMappingURL=breadcrumbArrow.js.map