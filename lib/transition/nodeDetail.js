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
var strings_1 = require("../util/strings");
var keysAndValues_1 = require("./keysAndValues");
var NodeDetail = (function (_super) {
    __extends(NodeDetail, _super);
    function NodeDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeDetail.prototype.stateName = function () {
        var node = this.props.node;
        var name = node && node.state && node.state.name;
        if (name === "")
            name = "(root)";
        return name && name.split(".").reverse()[0];
    };
    NodeDetail.prototype.params = function () {
        var node = this.props.node;
        return node && node.paramSchema.reduce(function (params, param) {
            params[param.id] = node.paramValues[param.id];
            return params;
        }, {});
    };
    NodeDetail.prototype.resolves = function () {
        var asString = function (val) {
            return typeof val === 'string' ? val : strings_1.maxLength(30, strings_1.stringify(val));
        };
        var node = this.props.node;
        var ignoredTokens = ['$stateParams', '$transition$'];
        return node && node.resolvables
            .filter(function (r) { return ignoredTokens.indexOf(r.token) === -1; })
            .reduce(function (acc, r) { acc[asString(r.token)] = r.data; return acc; }, {});
    };
    NodeDetail.prototype.render = function () {
        return !this.props.node ? null : (preact_1.h("div", { className: "uirNodeDetail" },
            preact_1.h("div", { className: "uir-header" },
                preact_1.h("div", { className: "nowrap deemphasize" },
                    "(",
                    this.props.type,
                    " state)"),
                preact_1.h("div", { className: "statename" }, this.stateName())),
            preact_1.h(keysAndValues_1.KeysAndValues, { data: this.params(), classes: { outerdiv: 'params', section: 'paramslabel deemphasize' }, labels: { section: 'Parameter values', modalTitle: 'Parameter value: ' } }),
            preact_1.h(keysAndValues_1.KeysAndValues, { data: this.resolves(), classes: { outerdiv: 'params resolve', section: 'resolvelabel deemphasize' }, labels: { section: 'Resolved data', modalTitle: 'Resolved value: ' } })));
    };
    return NodeDetail;
}(preact_1.Component));
exports.NodeDetail = NodeDetail;
//# sourceMappingURL=nodeDetail.js.map