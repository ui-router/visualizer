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
var stateNode_1 = require("./stateNode");
var animatepath_1 = require("../util/animatepath");
var easing_1 = require("../util/easing");
var renderer_1 = require("./renderer");
var stateVisNode_1 = require("./stateVisNode");
var resetMetadata = {
    label: '',
    highlight: false,
    active: false,
    future: false,
    retained: false,
    entered: false,
    exited: false,
    inactive: true
};
var StateTree = (function (_super) {
    __extends(StateTree, _super);
    function StateTree() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            nodes: [],
            layout: {}
        };
        _this.nodes = [];
        _this.unmounted = false;
        _this.cancelCurrentAnimation = function () { return null; };
        _this.doLayoutAnimation = function () {
            _this.cancelCurrentAnimation();
            var nodes = _this.getNodes();
            if (!nodes.length)
                return;
            var rootNode = nodes.filter(function (state) { return state.name === ""; })[0];
            _this.props.renderer.layoutFn(rootNode);
            // Move all non-visible nodes to same x/y coords as the nearest visible parent
            nodes.filter(function (node) { return !node.visible; }).forEach(function (node) {
                var visibleAncestor = node._parent;
                while (visibleAncestor && !visibleAncestor.visible)
                    visibleAncestor = visibleAncestor._parent;
                if (visibleAncestor) {
                    node.x = visibleAncestor.x;
                    node.y = visibleAncestor.y;
                }
            });
            var dimensions = _this.dimensions();
            // Transforms x coord from the tree layout to fit the viewport using scale/offset values
            var transformX = function (xval) { return xval * dimensions.scaleX + dimensions.offsetX; };
            // Transforms y coord from the tree layout to fit the viewport using scale/offset values
            var transformY = function (yval) { return yval * dimensions.scaleY + dimensions.offsetY; };
            var getCurrentCoords = function (node) {
                return ({ x: node.animX || _this.props.width / 2, y: node.animY || _this.props.height / 2 });
            };
            // An array containing current x/y coords for all nodes
            // [ x1, y1, x2, y2, x3, y3, x4, y4 ]
            var currentCoords = nodes.map(getCurrentCoords).map(function (obj) { return [obj.x, obj.y]; })
                .reduce(function (acc, arr) { return acc.concat(arr); }, []);
            // An array containing target x/y coords for all nodes
            // [ x1', y1', x2', y2', x3', y3', x4', y4' ]
            var targetCoords = nodes.map(function (node) { return [transformX(node.x), transformY(node.y)]; })
                .reduce(function (acc, arr) { return acc.concat(arr); }, []);
            // xyValArray is an array containing x/y coords for all nodes,
            // interpolated between currentCoords and targetCoords based on time
            // [ x1'', y1'', x2'', y2'', x3'', y3'', x4'', y4'' ]
            var animationFrame = function (xyValArray) {
                var tupleCount = xyValArray.length / 2;
                for (var i = 0; i < tupleCount && i < nodes.length; i++) {
                    var node = nodes[i];
                    node.animX = xyValArray[(i * 2)];
                    node.animY = xyValArray[(i * 2) + 1];
                }
                _this.setState({ nodes: nodes });
            };
            _this.cancelCurrentAnimation = animatepath_1.animatePath(targetCoords, currentCoords, 500, animationFrame, function () { return null; }, easing_1.easing.easeInOutExpo);
        };
        _this.nodeForState = function (nodes, state) {
            return nodes.filter(function (node) { return node.name === state.name; })[0];
        };
        _this.updateStates = function () {
            var router = _this.props.router;
            var states = router.stateService.get().map(function (s) { return s.$$state(); });
            var known = _this.nodes.map(Object.getPrototypeOf);
            var toAdd = states.filter(function (s) { return known.indexOf(s) === -1; });
            var toDel = known.filter(function (s) { return states.indexOf(s) === -1; });
            var nodes = _this.nodes = _this.nodes.slice();
            if (toAdd.length || toDel.length) {
                toAdd.map(function (s) { return stateVisNode_1.createStateVisNode(s); }).forEach(function (n) { return nodes.push(n); });
                toDel.map(function (del) { return nodes.filter(function (node) { return del.isPrototypeOf(node); }); })
                    .reduce(function (acc, x) { return acc.concat(x); }, [])
                    .forEach(function (node) { return nodes.splice(nodes.indexOf(node), 1); });
                // Rebuild each node's children array
                nodes.forEach(function (n) { return n._children = []; });
                nodes.forEach(function (n) {
                    if (!n || !n.parent)
                        return;
                    var parentNode = _this.nodeForState(nodes, n.parent);
                    if (!parentNode)
                        return;
                    parentNode._children.push(n);
                    n._parent = parentNode;
                });
                nodes.forEach(function (n) { return n.future = !!n.lazyLoad; });
            }
            if (!_this.unmounted && !_this.deregisterStateListenerFn) {
                // poll if ui-router version is 1.0.0-beta.1 or earlier
                setTimeout(_this.updateStates, 1000);
            }
            _this.setState({ nodes: nodes }, _this.doLayoutAnimation);
        };
        _this.updateNodes = function ($transition$) {
            var nodes = _this.nodes.map(function (node) { return Object.assign(node, resetMetadata); });
            nodes.forEach(function (n) { return n.future = !!n.lazyLoad; });
            if ($transition$) {
                var tc = $transition$.treeChanges();
                var getNode = function (node) {
                    return _this.nodeForState(_this.nodes, node.state);
                };
                tc.retained.concat(tc.entering).map(getNode).filter(function (x) { return x; }).forEach(function (n) { return n.entered = true; });
                tc.retained.map(getNode).filter(function (x) { return x; }).forEach(function (n) { return n.retained = true; });
                tc.exiting.map(getNode).filter(function (x) { return x; }).forEach(function (n) { return n.exited = true; });
                tc.to.slice(-1).map(getNode).filter(function (x) { return x; }).forEach(function (n) { n.active = true; n.label = "active"; });
            }
            _this.setState({ nodes: _this.nodes }, _this.doLayoutAnimation);
        };
        return _this;
    }
    StateTree.create = function (router, element, props) {
        if (props === void 0) { props = {}; }
        if (!element) {
            element = document.createElement("div");
            element.id = "uirStateTree";
        }
        var initialProps = Object.assign({}, props, { router: router, sizes: renderer_1.DEFAULT_RENDERER });
        var _render = function () {
            document.body.appendChild(element);
            preact_1.render(preact_1.h(StateTree, initialProps), element);
        };
        document.addEventListener('DOMContentLoaded', _render, false);
        return element;
    };
    StateTree.prototype.componentDidMount = function () {
        var _this = this;
        var registry = this.props.router.stateRegistry;
        var $transitions = this.props.router.transitionService;
        // Register states changed listener
        if (registry.onStatesChanged) {
            this.deregisterStateListenerFn = registry.onStatesChanged(function () { return _this.updateStates(); });
        }
        this.updateStates();
        // Register onSuccess transition hook to toggle the SVG classes
        this.deregisterHookFn = $transitions.onSuccess({}, function (trans) { return _this.updateNodes(trans); });
        this.updateNodes();
        var lastSuccessful = this.props.router.globals.successfulTransitions.peekTail();
        if (lastSuccessful) {
            this.updateNodes(lastSuccessful);
        }
        var pending = this.props.router.globals.transition;
        if (pending) {
            pending.promise.then(function () { return _this.updateNodes(pending); });
        }
    };
    StateTree.prototype.componentWillReceiveProps = function () {
        var nodes = this.state.nodes;
        this.setState({ nodes: nodes }, this.updateStates);
    };
    StateTree.prototype.dimensions = function () {
        var newProps = {};
        var radius = 15;
        var offsetX = 0;
        var offsetY = radius * 2;
        var height = this.props.height || 500;
        var width = this.props.width || 500;
        var scaleX = newProps.scaleX || (width - offsetX * 2);
        var scaleY = newProps.scaleY || (height - offsetY * 2);
        return { radius: radius, offsetX: offsetX, offsetY: offsetY, scaleX: scaleX, scaleY: scaleY };
    };
    StateTree.prototype.componentWillUnmount = function () {
        this.unmounted = true;
        this.deregisterHookFn && this.deregisterHookFn();
    };
    StateTree.prototype.getNodes = function () {
        return this.nodes.slice().sort(this.props.renderer.sortNodesFn);
    };
    StateTree.prototype.render = function () {
        var _this = this;
        var renderer = this.props.renderer;
        var renderNodes = this.getNodes()
            .filter(function (node) { return node.visible && node.animX && node.animY; });
        return (preact_1.h("div", { className: "statevis" },
            preact_1.h("svg", { width: this.props.width, height: this.props.height },
                renderNodes.filter(function (node) { return !!node.parent; }).map(function (node) {
                    return renderer.edgeRenderFn(node, renderer);
                }),
                renderNodes.map(function (node) {
                    return preact_1.h(stateNode_1.StateNode, { key: node.name, node: node, router: _this.props.router, renderer: _this.props.renderer, doLayout: _this.doLayoutAnimation.bind(_this), x: node.animX, y: node.animY });
                }))));
    };
    return StateTree;
}(preact_1.Component));
exports.StateTree = StateTree;
//# sourceMappingURL=stateTree.js.map