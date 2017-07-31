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
var nodeDetail_1 = require("./nodeDetail");
var flowArrow_1 = require("./flowArrow");
var NodePaths = (function (_super) {
    __extends(NodePaths, _super);
    function NodePaths() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            retained: [],
            enterExit: []
        };
        return _this;
    }
    NodePaths.prototype.componentDidMount = function () {
        var trans = this.props.transition;
        var tcPaths = Object.assign({}, trans.treeChanges());
        // Ignore the root state when drawing paths.
        ["entering", "exiting", "retained"]
            .forEach(function (key) { return tcPaths[key] = tcPaths[key].filter(function (node) { return !!node.state.name; }); });
        var partialKey = function (pathname, idx) {
            var node = tcPaths[pathname][idx];
            return node ? node.state.name : "";
        };
        var key = function (pathname1, pathname2, idx) {
            return trans.$id + "." + partialKey(pathname1, idx) + "-" + partialKey(pathname2, idx);
        };
        var retained = tcPaths.retained
            .map(function (node, idx) { return ({ key: key('retained', 'retained', idx), to: node, toType: 'retain', from: node, fromType: 'retain' }); });
        var enterExit = [];
        var maxPathLength = Math.max(tcPaths.exiting.length, tcPaths.entering.length);
        for (var i = 0; i < maxPathLength; i++) {
            enterExit.push({
                key: key('exiting', 'entering', i),
                to: tcPaths.entering[i],
                toType: tcPaths.entering[i] && 'enter',
                from: tcPaths.exiting[i],
                fromType: tcPaths.exiting[i] && 'exit'
            });
        }
        this.setState({ retained: retained, enterExit: enterExit });
    };
    NodePaths.prototype.render = function () {
        var height = 2000;
        var retained = this.state.retained || [];
        var enterExit = this.state.enterExit || [];
        var lastEnterIdx = enterExit.filter(function (x) { return !!x.toType; }).length - 1;
        return (preact_1.h("table", { className: "paths" },
            preact_1.h("thead", null,
                preact_1.h("tr", null,
                    preact_1.h("th", null, "From Path"),
                    preact_1.h("th", null, "To Path"))),
            preact_1.h("tbody", null,
                retained.map(function (elem) {
                    return preact_1.h("tr", { key: elem.key },
                        preact_1.h("td", { className: elem.fromType, colSpan: 2 },
                            preact_1.h(nodeDetail_1.NodeDetail, { node: elem.from, type: elem.fromType })));
                }),
                enterExit.map(function (elem, idx) {
                    return preact_1.h("tr", { key: elem.key },
                        preact_1.h("td", { colSpan: 2 },
                            preact_1.h("div", { className: "uirTransVisRow" },
                                preact_1.h("div", { className: "" + elem.fromType }, !elem.fromType ? null :
                                    preact_1.h("div", null,
                                        preact_1.h("div", { className: "uirNodeContent" },
                                            preact_1.h(nodeDetail_1.NodeDetail, { node: elem.from, type: elem.fromType }),
                                            preact_1.h(flowArrow_1.FlowArrow, { bottom: 'V', top: idx ? 'V' : elem.toType ? 'RU' : 'AU' })))),
                                preact_1.h("div", { className: "" + elem.toType }, !elem.toType ? null :
                                    preact_1.h("div", null,
                                        preact_1.h("div", { className: "uirNodeContent" },
                                            preact_1.h(flowArrow_1.FlowArrow, { top: idx ? 'V' : elem.fromType ? 'RD' : 'V', bottom: idx == lastEnterIdx ? 'AD' : 'V' }),
                                            preact_1.h(nodeDetail_1.NodeDetail, { node: elem.to, type: elem.toType })))))));
                }))));
    };
    return NodePaths;
}(preact_1.Component));
exports.NodePaths = NodePaths;
//# sourceMappingURL=nodePaths.js.map