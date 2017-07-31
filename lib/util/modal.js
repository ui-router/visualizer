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
var Modal = (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Modal.prototype.componentDidMount = function () {
        var el = this._ref;
        setTimeout(function () {
            var fades = el.getElementsByClassName("uir-fade");
            [].slice.apply(fades).forEach(function (node) { return node.className += " in"; });
        }, 35);
    };
    Modal.prototype.render = function () {
        var _this = this;
        return (preact_1.h("div", { ref: function (ref) { return _this._ref = ref; } },
            preact_1.h("div", { className: "uir-modal-backdrop uir-fade", style: { zIndex: 1040 } }),
            preact_1.h("div", { tabIndex: -1, className: "uir-modal uir-fade", style: { zIndex: 1050, display: "block" } },
                preact_1.h("div", { className: "uir-modal-dialog modal-lg" },
                    preact_1.h("div", { className: "uir-modal-content" }, this.props.children)))));
    };
    return Modal;
}(preact_1.Component));
Modal.show = function (labels, key, value, component) {
    var modal = document.body.querySelector("#uir-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "uir-modal";
        document.body.appendChild(modal);
    }
    var Nothing = function () { return null; };
    var close = function () { return preact_1.render(preact_1.h(Nothing, null), document.body, modal); };
    preact_1.render(preact_1.h(component, { close: close, labels: labels, key: key, value: value }), modal);
};
exports.Modal = Modal;
//# sourceMappingURL=modal.js.map