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
var StateSelector = (function (_super) {
    __extends(StateSelector, _super);
    function StateSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            current: null,
            states: [],
            deregisterFn: null
        };
        _this.selectState = function (event) {
            var $state = _this.props.router.stateService;
            var to = event.target.value;
            if (to)
                $state.go(to);
        };
        return _this;
    }
    StateSelector.prototype.componentDidMount = function () {
        var _this = this;
        var router = this.props.router;
        var updateStates = function () {
            return _this.setState({ states: router.stateRegistry.get().map(function (state) { return state.name; }) });
        };
        var updateCurrent = function (trans) {
            return _this.setState({ current: trans.to().name });
        };
        if (router.stateRegistry.onStatesChanged) {
            this.deregisterStateListenerFn = router.stateRegistry.onStatesChanged(updateStates);
        }
        var deregisterFn = router.transitionService.onSuccess({}, updateCurrent);
        this.setState({ current: router.globals.current.name, states: [], deregisterFn: deregisterFn });
        updateStates();
    };
    StateSelector.prototype.componentWillUnmount = function () {
        if (this.state.deregisterFn) {
            this.state.deregisterFn();
        }
        if (this.deregisterStateListenerFn) {
            this.deregisterStateListenerFn();
        }
    };
    StateSelector.prototype.render = function () {
        return (preact_1.h("select", { value: this.state.current || "", onChange: this.selectState, style: { maxWidth: 120 } },
            preact_1.h("option", { value: "" }, "Choose a state"),
            this.state.states.map(function (state) {
                return preact_1.h("option", { key: state, value: state }, state);
            })));
    };
    return StateSelector;
}(preact_1.Component));
exports.StateSelector = StateSelector;
//# sourceMappingURL=stateSelector.js.map