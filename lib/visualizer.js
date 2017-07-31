"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var stateSelector_1 = require("./selector/stateSelector");
exports.StateSelector = stateSelector_1.StateSelector;
var stateVisualizer_1 = require("./state/stateVisualizer");
exports.StateVisualizer = stateVisualizer_1.StateVisualizer;
var stateTree_1 = require("./state/stateTree");
exports.StateTree = stateTree_1.StateTree;
var transitionVisualizer_1 = require("./transition/transitionVisualizer");
exports.TransitionVisualizer = transitionVisualizer_1.TransitionVisualizer;
var visualizer = function (router) { return new Visualizer(router, {}); };
exports.visualizer = visualizer;
function unmountComponent(node) {
    var Nothing = function () { return null; };
    preact_1.render(preact_1.h(Nothing, null), document.body, node);
}
var DEFAULTS = {
    state: true,
    transition: true,
};
var Visualizer = (function () {
    function Visualizer(router, options) {
        this.router = router;
        this.name = "visualizer";
        options = Object.assign({}, DEFAULTS, options);
        if (options.state) {
            this.stateVisualizerEl = stateVisualizer_1.StateVisualizer.create(router);
        }
        if (options.transition) {
            this.transitionVisualizerEl = transitionVisualizer_1.TransitionVisualizer.create(router);
        }
    }
    Visualizer.prototype.dispose = function (router) {
        this.stateVisualizerEl && unmountComponent(this.stateVisualizerEl);
        this.transitionVisualizerEl && unmountComponent(this.transitionVisualizerEl);
        this.stateVisualizerEl = null;
        this.transitionVisualizerEl = null;
    };
    return Visualizer;
}());
exports.Visualizer = Visualizer;
//# sourceMappingURL=visualizer.js.map