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
require("./transitionVisualizer.css");
var transitionView_1 = require("./transitionView");
var easing_1 = require("../util/easing");
var animatepath_1 = require("../util/animatepath");
/**
 * This outer component manages the list of all transitions (history), and provides a fixed, scrolling viewport.
 * It attaches hooks for lifecycle events and decorates the transition with a descriptive message.
 */
var TransitionVisualizer = (function (_super) {
    __extends(TransitionVisualizer, _super);
    function TransitionVisualizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.deregisterFns = [];
        _this.state = {
            transitions: [],
            pointerEvents: "auto",
        };
        _this.cancelPreviousAnim = null;
        /**
         * Disable pointer events when the mouse is above the timeline
         *
         * This allows clicks to pass through the outer div to the user's app components
         * even when a transitionview details box is open and pinned.
         *
         * Enable pointer events when mouse is inside the timeline to allow horizontal scroll & scroll wheel
         */
        _this.onMouseMove = function (evt) {
            var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            var pointerEvents = (windowHeight - evt.clientY < 65 ? "auto" : "none");
            if (_this.state.pointerEvents != pointerEvents) {
                _this.setState({ pointerEvents: pointerEvents });
            }
        };
        return _this;
    }
    /**
     * Creates a new TransitionVisualizer and adds it to the document.
     *
     * @param router the UIRouter object
     * @param element (optional) the element where the TransitionVisualizer should be placed.
     *                If no element is passed, an element will be created in the body.
     * @param props maximum transitions default: { maximumTransitions: 15 }
     *
     *
     * # Angular 1 + UI-Router (1.0.0-beta.2 and higher):
     *
     * Inject the router (`$uiRouter`) in a run block, then call TransitionVisualizer.create();
     *
     * ```
     * app.run(function($uiRouter) {
     *   TransitionVisualizer.create($uiRouter);
     * });
     * ```
     *
     * # Angular 1 + UI-Router 1.0.0-alpha.1 through 1.0.0-beta.1:
     *
     * Inject the router (`ng1UIRouter`) in a run block, then call TransitionVisualizer.create();
     *
     * ```
     * app.run(function(ng1UIRouter) {
     *   TransitionVisualizer.create(ng1UIRouter);
     * });
     * ```
     *
     * Angular 2:
     *
     * Call TransitionVisualizer.create() from your UIRouterConfig
     *
     * ```
     * export class MyUIRouterConfig extends UIRouterConfig {
     *   configure(router: UIRouter) {
     *     TransitionVisualizer.create(router);
     *   }
     * }
     * ```
     *
     * React:
     *
     * Call TransitionVisualizer.create() from your bootstrap
     *
     * ```
     * let router = new UIRouterReact();
     * TransitionVisualizer.create(router);
     * router.start();
     * ```
     *
     * @return the element that was bootstrapped.
     *         You can destroy the component using:
     *         [ReactDOM.unmountComponentAtNode](https://facebook.github.io/react/docs/top-level-api.html#reactdom.unmountcomponentatnode)
     */
    TransitionVisualizer.create = function (router, element, props) {
        if (props === void 0) { props = {}; }
        if (!element) {
            element = document.createElement("div");
            element.id = "uirTransitionVisualizer";
        }
        var initialProps = Object.assign({}, props, { router: router });
        var _render = function () {
            document.body.appendChild(element);
            preact_1.render(preact_1.h(TransitionVisualizer, initialProps), element);
        };
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            _render();
        }
        else {
            document.addEventListener('DOMContentLoaded', _render, false);
        }
        return element;
    };
    TransitionVisualizer.prototype.componentDidMount = function () {
        var _this = this;
        var dereg = this.props.router.transitionService.onBefore({}, function (trans) {
            _this.setState({ transitions: _this.state.transitions.concat(trans) });
            var duration = 750, el = _this._div.children[0];
            var scrollToRight = function () {
                var targetScrollX = el.scrollWidth - el.clientWidth + 200;
                _this.cancelPreviousAnim && _this.cancelPreviousAnim();
                var newVal = [targetScrollX], oldVal = [el.scrollLeft];
                var max = _this.props.maximumTransitions;
                var enforceMax = function () {
                    var list = _this.state.transitions;
                    if (list.length <= max)
                        return;
                    _this.setState({ transitions: list.slice(list.length - max) });
                };
                var callback = function (vals) { return el.scrollLeft = vals[0]; };
                _this.cancelPreviousAnim = animatepath_1.animatePath(newVal, oldVal, duration, callback, enforceMax, easing_1.easing.easeInOutCubic);
            };
            setTimeout(scrollToRight, 25);
        });
        this.deregisterFns.push(dereg);
        document.body.addEventListener("mousemove", this.onMouseMove);
        this.deregisterFns.push(function () { return document.body.removeEventListener("mousemove", _this.onMouseMove); });
    };
    TransitionVisualizer.prototype.componentWillUnmount = function () {
        while (this.deregisterFns.length)
            this.deregisterFns.pop()();
    };
    TransitionVisualizer.prototype.render = function () {
        var _this = this;
        var pointerEvents = this.state.pointerEvents;
        return (preact_1.h("div", { ref: function (el) { return _this._div = el; } },
            preact_1.h("div", { className: "transitionHistory", style: { pointerEvents: pointerEvents } },
                this.state.transitions.map(function (trans) {
                    return preact_1.h("div", { key: trans.$id },
                        preact_1.h(transitionView_1.TransitionView, { transition: trans }),
                        preact_1.h("div", { style: { minWidth: "18em", border: "1px solid transparent" } }));
                }),
                preact_1.h("div", { style: { width: "200px", height: "1px" } }))));
    };
    return TransitionVisualizer;
}(preact_1.Component));
TransitionVisualizer.defaultProps = {
    router: null,
    maximumTransitions: 15
};
exports.TransitionVisualizer = TransitionVisualizer;
//# sourceMappingURL=transitionVisualizer.js.map