"use strict";
exports.moduleName = "ui.router.visualizer";
var angular = require("angular");
exports.ng = angular || window.angular;
exports.app = exports.ng.module(exports.moduleName, ['ui.router']);
require("./d3ng");
require("./easing");
require("./service");
//# sourceMappingURL=statevis.module.js.map