"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var preact_1 = require("preact");
var Pretty = (function (_super) {
    __extends(Pretty, _super);
    function Pretty() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.preStyle = {
            display: 'block',
            padding: '10px 30px',
            margin: '0',
        };
        _this.state = { show: true };
        return _this;
    }
    Pretty.prototype.toggle = function () {
        this.setState({
            show: !this.state.show,
        });
    };
    Pretty.prototype.render = function () {
        return (preact_1.h("div", null, (this.state.show ?
            preact_1.h("pre", { style: this.preStyle }, JSON.stringify(this.props.data, null, 2)) : false)));
    };
    return Pretty;
}(preact_1.Component));
exports.Pretty = Pretty;
//# sourceMappingURL=pretty.js.map