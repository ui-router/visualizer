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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
require("./stateVisualizer.css");
var stateSelector_1 = require("../selector/stateSelector");
var toggleClass_1 = require("../util/toggleClass");
var draggable_1 = require("../util/draggable");
var stateTree_1 = require("./stateTree");
var renderer_1 = require("./renderer");
var imgChevron = require('../../images/16/chevron-down.png');
var StateVisualizer = (function (_super) {
    __extends(StateVisualizer, _super);
    function StateVisualizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { height: null, width: null, presetName: 'Tree', renderer: renderer_1.DEFAULT_RENDERER };
        _this.deregisterFns = [];
        _this.minimize = function (evt) {
            evt && evt.preventDefault();
            evt && evt.stopPropagation();
            var el = _this.el;
            var bounds = el.getBoundingClientRect();
            _this.top = (bounds.top) + "px";
            _this.left = (bounds.left) + "px";
            _this.right = (window.innerWidth - bounds.right) + "px";
            _this.bottom = (window.innerHeight - bounds.bottom) + "px";
            el.style.top = "auto";
            el.style.left = "auto";
            el.style.right = _this.right;
            el.style.bottom = _this.bottom;
            var unminimize = function () {
                el.style.top = "auto";
                el.style.left = "auto";
                el.style.right = _this.right;
                el.style.bottom = _this.bottom;
                toggleClass_1.toggleClass('minimized')(el);
                el.removeEventListener("click", unminimize);
                var animationEndListener = function (evt) {
                    var bounds = el.getBoundingClientRect();
                    el.style.top = bounds.top + "px";
                    el.style.left = bounds.left + "px";
                    el.style.right = "auto";
                    el.style.bottom = "auto";
                    el.removeEventListener("transitionend", animationEndListener);
                };
                el.addEventListener("transitionend", animationEndListener);
            };
            toggleClass_1.addClass('minimized')(el);
            el.addEventListener("click", unminimize);
            // wait 50ms to avoid coordinates jumping directly to 0/0 and avoid animation
            setTimeout(function () { return el.style.right = el.style.bottom = "0"; }, 50);
        };
        _this.svgWidth = function () { return _this.props.width || _this.state.width || 350; };
        _this.svgHeight = function () { return (_this.props.height || _this.state.height || 250) - 25; };
        return _this;
    }
    /**
     * Creates a new StateVisualizer and adds it to the document.
     *
     * @param router the UIRouter object
     * @param element (optional) the element where the StateVisualizer should be placed.
     *                If no element is passed, an element will be created in the body.
     * @param props height/width properties default: { height: 350, width: 250 }
     *
     * # Angular 1 + UI-Router (1.0.0-beta.2 and higher):
     *
     * Inject the router (`$uiRouter`) in a run block, then call StateVisualizer.create();
     *
     * ```
     * app.run(function($uiRouter) {
     *   StateVisualizer.create($uiRouter);
     * });
     * ```
     *
     * # Angular 1 + UI-Router 1.0.0-alpha.1 through 1.0.0-beta.1:
     *
     * Inject the router (`ng1UIRouter`) in a run block, then call StateVisualizer.create();
     *
     * ```
     * app.run(function(ng1UIRouter) {
     *   StateVisualizer.create(ng1UIRouter);
     * });
     * ```
     *
     * Angular 2:
     *
     * Call StateVisualizer.create() from your UIRouterConfig
     *
     * ```
     * export class MyUIRouterConfig extends UIRouterConfig {
     *   configure(router: UIRouter) {
     *     StateVisualizer.create(router);
     *   }
     * }
     * ```
     *
     * React:
     *
     * Call StateVisualizer.create() from your bootstrap
     *
     * ```
     * let router = new UIRouterReact();
     * StateVisualizer.create(router);
     * router.start();
     * ```
     *
     * @return the element that was bootstrapped.
     *         You can destroy the component using:
     *         [ReactDOM.unmountComponentAtNode](https://facebook.github.io/react/docs/top-level-api.html#reactdom.unmountcomponentatnode)
     */
    StateVisualizer.create = function (router, element, props) {
        if (props === void 0) { props = {}; }
        if (!element) {
            element = document.createElement("div");
            element.id = "uirStateVisualizer";
        }
        var initialProps = Object.assign({}, props, { router: router, minimizeAfter: 2500 });
        var _render = function () {
            document.body.appendChild(element);
            preact_1.render(preact_1.h(StateVisualizer, initialProps), element);
        };
        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            _render();
        }
        else {
            document.addEventListener('DOMContentLoaded', _render, false);
        }
        return element;
    };
    StateVisualizer.prototype.handleClick = function () {
        if (this.minimizeTimeout) {
            clearTimeout(this.minimizeTimeout);
            this.minimizeTimeout = null;
        }
    };
    StateVisualizer.prototype.componentWillUnmount = function () {
        this.deregisterFns.forEach(function (fn) { return fn(); });
    };
    StateVisualizer.prototype.componentDidMount = function () {
        var controlsEl = this.el.querySelector('.uirStateVisControls');
        var visEl = this.el.querySelector('.statevis');
        this.deregisterFns.push(draggable_1.draggable(controlsEl, draggable_1.dragActions.move(this.el)));
        this.deregisterFns.push(draggable_1.draggable(visEl, draggable_1.dragActions.move(this.el)));
        this.monitorResizeEvents();
        if (this.props.minimizeAfter) {
            this.minimizeTimeout = setTimeout(this.minimize.bind(this), this.props.minimizeAfter);
        }
    };
    StateVisualizer.prototype.monitorResizeEvents = function () {
        var _this = this;
        var _width = this.el.style.width;
        var _height = this.el.style.height;
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName == 'style') {
                    var el = mutation.target, newwidth = el['style'].width, newheight = el['style'].height;
                    if (newwidth !== _width || newheight !== _height) {
                        _width = newwidth;
                        _height = newheight;
                        var width = parseInt(newwidth.replace(/px$/, ""));
                        var height = parseInt(newheight.replace(/px$/, ""));
                        _this.setState({ width: width, height: height });
                    }
                }
            });
        });
        var config = {
            attributes: true,
            childList: false,
            characterData: false,
            subtree: false,
            attributeFilter: ['style']
        };
        observer.observe(this.el, config);
        this.deregisterFns.push(function () { return observer.disconnect(); });
    };
    StateVisualizer.prototype.handleZoom = function (event) {
        var el = event.target;
        var value = parseFloat(el['value']);
        var renderer = __assign({}, this.state.renderer, { zoom: value });
        this.setState({ renderer: renderer });
    };
    StateVisualizer.prototype.handleLayout = function (event) {
        var presetName = event.target['value'];
        var settings = renderer_1.RENDERER_PRESETS[presetName];
        var renderer = __assign({}, this.state.renderer, settings);
        this.setState({ renderer: renderer, presetName: presetName });
    };
    StateVisualizer.prototype.render = function () {
        var _this = this;
        var zoomLevels = [2.0, 1.5, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3];
        return (preact_1.h("div", { ref: function (el) { return _this.el = el; }, className: "uirStateVisContainer", onClick: this.handleClick.bind(this) },
            preact_1.h("div", { className: "uirStateVisControls" },
                preact_1.h("div", null,
                    " Current State: ",
                    preact_1.h(stateSelector_1.StateSelector, { router: this.props.router })),
                preact_1.h("div", null,
                    preact_1.h("select", { onChange: this.handleLayout.bind(this), value: this.state.presetName, style: { maxWidth: 100 } }, Object.keys(renderer_1.RENDERER_PRESETS).map(function (preset) {
                        return preact_1.h("option", { value: preset }, preset);
                    })),
                    preact_1.h("select", { onChange: this.handleZoom.bind(this), value: this.state.renderer.zoom + '', style: { maxWidth: 100 } }, zoomLevels.map(function (level) {
                        return preact_1.h("option", { value: level + "" },
                            level,
                            "x");
                    }))),
                preact_1.h("button", { onClick: this.minimize },
                    preact_1.h("img", { src: imgChevron, style: { cursor: 'pointer' } }))),
            preact_1.h(stateTree_1.StateTree, { router: this.props.router, width: this.svgWidth(), height: this.svgHeight(), renderer: this.state.renderer })));
    };
    return StateVisualizer;
}(preact_1.Component));
exports.StateVisualizer = StateVisualizer;
//# sourceMappingURL=stateVisualizer.js.map