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
var resolveData_1 = require("./resolveData");
var strings_1 = require("../util/strings");
var isObject = function (val) { return typeof val === 'object'; };
var displayValue = function (object) {
    if (object === undefined)
        return "undefined";
    if (object === null)
        return "null";
    if (typeof object === 'string')
        return '"' + strings_1.maxLength(100, object) + '"';
    if (Array.isArray(object))
        return "[Array]";
    if (isObject(object))
        return "[Object]";
    if (typeof object.toString === 'function')
        return strings_1.maxLength(100, object.toString());
    return object;
};
var defaultClass = {
    outerdiv: 'param',
    keyvaldiv: 'keyvalue',
    section: 'paramslabel deemphasize',
    _key: 'paramid',
    value: 'paramvalue'
};
var KeysAndValues = (function (_super) {
    __extends(KeysAndValues, _super);
    function KeysAndValues() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isEmpty = function () {
            return !_this.props.data || Object.keys(_this.props.data).length === 0;
        };
        _this.class = function (name) {
            return _this.props.classes && _this.props.classes[name] !== undefined ?
                _this.props.classes[name] :
                defaultClass[name];
        };
        return _this;
    }
    KeysAndValues.prototype.render = function () {
        var _this = this;
        var renderValue = function (key, val) {
            if (isObject(val))
                return (preact_1.h("span", { className: "link", onClick: function () { return modal_1.Modal.show(_this.props.labels, key, val, resolveData_1.ResolveData); } }, "[Object]"));
            return (preact_1.h("div", { className: _this.props.classes.value }, displayValue(val)));
        };
        return this.isEmpty() ? null : (preact_1.h("div", { className: this.class('outerdiv') },
            preact_1.h("div", { className: this.class('section') }, this.props.labels.section),
            Object.keys(this.props.data).map(function (key) {
                return preact_1.h("div", { key: key, className: _this.class('keyvaldiv') },
                    preact_1.h("div", { className: _this.class('_key') },
                        key,
                        ":"),
                    preact_1.h("div", { className: _this.class('value') }, renderValue(key, _this.props.data[key])));
            })));
    };
    return KeysAndValues;
}(preact_1.Component));
exports.KeysAndValues = KeysAndValues;
//# sourceMappingURL=keysAndValues.js.map