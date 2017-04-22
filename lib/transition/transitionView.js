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
var transitionPopover_1 = require("./transitionPopover");
var breadcrumbArrow_1 = require("./breadcrumbArrow");
var strings_1 = require("../util/strings");
var cancelablePromise_1 = require("../util/cancelablePromise");
var TransitionView = (function (_super) {
    __extends(TransitionView, _super);
    function TransitionView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.transitionPromise = null;
        _this.state = {
            status: 'running',
            message: null,
            rejection: null,
            pinned: false,
            expanded: false,
            open: false,
            deregisterFunctions: []
        };
        _this.togglePin = function () { return _this.setState({ pinned: !_this.state.pinned }); };
        _this.toggleExpand = function () { return _this.setState({ expanded: !_this.state.expanded }); };
        _this.open = function () { return _this.setState({ open: true }); };
        _this.close = function () { return _this.setState({ open: false }); };
        return _this;
    }
    TransitionView.prototype.componentDidMount = function () {
        var _this = this;
        var trans = this.props.transition;
        var setMessage = function (message) {
            // Transition hooks are computed when the trans starts; they can't be removed while the trans is running.
            if (!_this.transitionPromise.isCanceled) {
                _this.setState({ message: message });
            }
        };
        var statename = function (state) { return state.name || "(root)"; };
        var fns = [];
        fns.push(trans.onStart({}, function () { return setMessage("Starting..."); }, { priority: 10000 }));
        fns.push(trans.onExit({}, function (t, state) { return setMessage("Exiting " + statename(state)); }, { priority: 10000 }));
        fns.push(trans.onRetain({}, function (t, state) { return setMessage("Retained " + statename(state)); }, { priority: 10000 }));
        fns.push(trans.onEnter({}, function (t, state) { return setMessage("Entering " + statename(state)); }, { priority: 10000 }));
        fns.push(trans.onFinish({}, function () { return setMessage("Finishing..."); }));
        this.setState({ deregisterFunctions: fns });
        var success = function () { return _this.setState({ status: "success", message: null }); };
        var error = function (err) {
            if (err && err.isCanceled)
                return;
            var status = "error", rejection = null;
            if (err) {
                rejection = err && err.message;
                var type = err && err.type;
                if (type == 2 && err.redirected === true) {
                    status = "redirected";
                    var targetState = err['detail'];
                    var toState = targetState.name();
                    var toParams = JSON.stringify(targetState.params());
                    rejection = strings_1.maxLength(100, toState + "(" + toParams) + ")";
                }
                if (type == 5) {
                    status = "ignored";
                    rejection = "All states and parameters in the To and From paths are identical.";
                }
            }
            _this.setState({ status: status, rejection: rejection, message: null });
        };
        this.transitionPromise = cancelablePromise_1.makeCancelable(trans.promise);
        this.transitionPromise.promise.then(success, error);
    };
    TransitionView.prototype.componentWillUnmount = function () {
        this.transitionPromise.cancel();
        if (this.state.deregisterFunctions) {
            this.state.deregisterFunctions.forEach(function (fn) { return fn(); });
        }
    };
    TransitionView.prototype.render = function () {
        return (preact_1.h("div", { onMouseEnter: this.open, onMouseLeave: this.close },
            preact_1.h(transitionPopover_1.TransitionPopover, { transition: this.props.transition, status: this.state.status, rejection: this.state.rejection, pinned: this.state.pinned, expanded: this.state.expanded, open: this.state.open, togglePinned: this.togglePin, toggleExpand: this.toggleExpand }),
            preact_1.h(breadcrumbArrow_1.BreadcrumbArrow, { transition: this.props.transition, status: this.state.status, message: this.state.message, toggleExpand: this.toggleExpand })));
    };
    return TransitionView;
}(preact_1.Component));
exports.TransitionView = TransitionView;
//# sourceMappingURL=transitionView.js.map