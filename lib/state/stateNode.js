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
var StateNode = (function (_super) {
    __extends(StateNode, _super);
    function StateNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.goTimeout = null;
        _this.handleCollapseClicked = function (event) {
            clearTimeout(_this.goTimeout);
            _this.props.node._collapsed = !_this.props.node._collapsed;
            _this.props.doLayout();
        };
        _this.handleGoClicked = function (event) {
            clearTimeout(_this.goTimeout);
            var stateName = _this.props.node.name;
            stateName = stateName.replace(/\.\*\*$/, "");
            _this.goTimeout = setTimeout(function () { return _this.props.router.stateService.go(stateName); }, 200);
        };
        return _this;
    }
    StateNode.prototype.render = function () {
        var renderer = this.props.renderer;
        var _a = this.props, node = _a.node, x = _a.x, y = _a.y;
        var baseRadius = renderer.baseRadius, baseFontSize = renderer.baseFontSize, baseNodeStrokeWidth = renderer.baseNodeStrokeWidth, zoom = renderer.zoom;
        var r = baseRadius * zoom;
        var fontSize = baseFontSize * zoom;
        var nodeStrokeWidth = (baseNodeStrokeWidth * (node.entered ? 1.5 : 1) * zoom);
        var classes = ["entered", "retained", "exited", "active", "inactive", "future", "highlight", "collapsed"];
        var circleClasses = classes.reduce(function (str, clazz) { return (str + (node[clazz] ? " " + clazz + " " : '')); }, '');
        var descendents = node.collapsed ? node.totalDescendents : 0;
        return (preact_1.h("g", { transform: "translate(" + x + ", " + y + ")", onClick: this.handleGoClicked, onDblClick: this.handleCollapseClicked },
            preact_1.h("circle", { className: circleClasses, "stroke-width": nodeStrokeWidth, r: r }),
            !node.collapsed ? "" :
                preact_1.h("text", { className: "label", "text-anchor": "middle", "font-size": fontSize * (descendents < 10 ? 1.0 : 0.8) },
                    "(",
                    descendents,
                    ")"),
            renderer.labelRenderFn(x, y, node, renderer),
            preact_1.h("text", { className: "label", "text-anchor": "middle", "font-size": fontSize, transform: "translate(0, " + r * 2 + ")" }, node.label)));
    };
    return StateNode;
}(preact_1.Component));
exports.StateNode = StateNode;
//# sourceMappingURL=stateNode.js.map