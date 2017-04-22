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
var FlowArrow = (function (_super) {
    __extends(FlowArrow, _super);
    function FlowArrow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.height = 1000;
        _this.renderCurve = function () { return (preact_1.h("path", { stroke: "white", "stroke-width": "20", fill: "none", d: "M50 " + _this.height + " V 70 Q50 20, 100 20 Q150 20, 150 70 V " + _this.height })); };
        _this.renderVerticalLine = function () { return (preact_1.h("svg", { viewBox: "0 70 100 " + (_this.height - 70), className: "flowArrowSvg" }, _this.renderCurve())); };
        _this.renderCurveRU = function () { return (preact_1.h("svg", { viewBox: "0 0 100 " + _this.height, className: "flowArrowSvg top" }, _this.renderCurve())); };
        _this.renderCurveRD = function () { return (preact_1.h("svg", { viewBox: "100 0 100 " + _this.height, className: "flowArrowSvg top" }, _this.renderCurve())); };
        _this.renderArrowU = function () { return (preact_1.h("svg", { viewBox: "0 0 100 " + _this.height, className: "flowArrowSvg top" },
            preact_1.h("path", { stroke: "white", "stroke-width": "20", fill: "none", d: "M50 " + _this.height + " V 20 " }),
            preact_1.h("polygon", { fill: "white", stroke: "white", "stroke-width": "20", points: "50,20 35,40 65,40" }))); };
        _this.renderArrowD = function () { return (preact_1.h("svg", { viewBox: "0 0 100 " + _this.height, className: "flowArrowSvg bottom" },
            preact_1.h("path", { stroke: "white", "stroke-width": "20", fill: "none", d: "M50 0 V " + (_this.height - 20) }),
            preact_1.h("polygon", { fill: "white", stroke: "white", "stroke-width": "20", points: "50," + (_this.height - 20) + " 35," + (_this.height - 40) + " 65," + (_this.height - 40) }))); };
        return _this;
    }
    FlowArrow.prototype.render = function () {
        var _this = this;
        var renderSvg = function (type) {
            switch (type) {
                case "V": return _this.renderVerticalLine();
                case "RU": return _this.renderCurveRU();
                case "RD": return _this.renderCurveRD();
                case "AU": return _this.renderArrowU();
                case "AD": return _this.renderArrowD();
                default: return null;
            }
        };
        return (preact_1.h("div", { className: "flowArrowCell" },
            preact_1.h("div", { style: { overflow: 'hidden', position: 'relative', flex: '1' } }, renderSvg(this.props.top)),
            preact_1.h("div", { style: { overflow: 'hidden', position: 'relative', flex: '1' } }, renderSvg(this.props.bottom))));
    };
    return FlowArrow;
}(preact_1.Component));
exports.FlowArrow = FlowArrow;
//# sourceMappingURL=flowArrow.js.map