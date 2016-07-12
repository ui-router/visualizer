(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("angular-ui-router"));
	else if(typeof define === 'function' && define.amd)
		define("ui-router-visualizer", ["angular", "angular-ui-router"], factory);
	else if(typeof exports === 'object')
		exports["ui-router-visualizer"] = factory(require("angular"), require("angular-ui-router"));
	else
		root["ui-router-visualizer"] = factory(root["angular"], root["angular-ui-router"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_8__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(1);
	__webpack_require__(7);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(17);
	var statevis_module_1 = __webpack_require__(2);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = statevis_module_1.moduleName;
	//# sourceMappingURL=statevis.js.map

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var statevis_module_1 = __webpack_require__(2);
	statevis_module_1.app.directive('draggable', function ($document) { return ({
	    restrict: "A",
	    scope: { draggable: '=' },
	    link: function (scope, elem) {
	        var enabled = !!scope.enabled;
	        scope.$watch("draggable", function (newval) {
	            enabled = !!newval;
	            isDragging = false;
	            elem.toggleClass("draggable", newval);
	        });
	        var isDragging = false;
	        var mx = 0, my = 0;
	        var x = 0, y = 0;
	        elem.on("mousedown", function (e) {
	            if (!enabled)
	                return;
	            isDragging = true;
	            mx = e.pageX;
	            my = e.pageY;
	            x = elem[0].offsetLeft;
	            y = elem[0].offsetTop;
	        });
	        elem.on("mousemove", function (e) {
	            if (!enabled || !isDragging)
	                return;
	            e.preventDefault();
	            elem[0].style.right = "auto";
	            elem[0].style.bottom = "auto";
	            elem[0].style.left = (x + (e.pageX - mx)) + 'px';
	            elem[0].style.top = (y + (e.pageY - my)) + 'px';
	        });
	        elem.on("mouseup", function () { isDragging = false; });
	        $document.on("mouseup", function () { isDragging = false; });
	    }
	}); });
	//# sourceMappingURL=draggable.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	exports.moduleName = "ui.router.visualizer";
	var angular = __webpack_require__(3);
	exports.ng = angular || window.angular;
	exports.app = exports.ng.module(exports.moduleName, ['ui.router']);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	//# sourceMappingURL=statevis.module.js.map

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/resin-io/triangular.js
	// http://alexandros.resin.io/angular-d3-svg/
	// MIT License https://opensource.org/licenses/MIT
	"use strict";
	var statevis_module_1 = __webpack_require__(2);
	/** This animation code was taken from trangular.js, and is used to interpolate 2 arrays of values using an easing fn */
	statevis_module_1.app.service("d3ng", function (easing, $rootScope) {
	    return {
	        animatePath: function (newValue, oldValue, duration, updateFrame, finishFn, easeFn) {
	            if (finishFn === void 0) { finishFn = function () { }; }
	            if (easeFn === void 0) { easeFn = easing.easeOutElastic; }
	            var start = null, interpolate = d3.interpolateArray(oldValue, newValue);
	            var step = function (now) {
	                if (duration === -1)
	                    return finishFn();
	                if (start == null)
	                    start = now;
	                var progress = now - start, percent = 1;
	                if (progress < duration) {
	                    requestAnimationFrame(step);
	                    percent = easeFn(progress, 0, 1, duration);
	                }
	                $rootScope.$apply(function () { return updateFrame(interpolate(percent)); });
	            };
	            requestAnimationFrame(step);
	            return function cancel() {
	                duration = -1;
	            };
	        }
	    };
	});
	//# sourceMappingURL=d3ng.js.map

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var statevis_module_1 = __webpack_require__(2);
	/** This is a collection of easing functions taken from jquery easing */
	statevis_module_1.app.service("easing", function () {
	    /* ============================================================
	     * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
	     *
	     * Open source under the BSD License.
	     *
	     * Copyright © 2008 George McGinley Smith
	     * All rights reserved.
	     * https://raw.github.com/danro/jquery-easing/master/LICENSE
	     * ======================================================== */
	    return {
	        // time, begin, change, duration
	        easeInOutQuad: function (t, b, c, d) {
	            if ((t /= d / 2) < 1)
	                return c / 2 * t * t + b;
	            return -c / 2 * ((--t) * (t - 2) - 1) + b;
	        },
	        easeInOutCubic: function (t, b, c, d) {
	            if ((t /= d / 2) < 1)
	                return c / 2 * t * t * t + b;
	            return c / 2 * ((t -= 2) * t * t + 2) + b;
	        },
	        easeInOutQuart: function (t, b, c, d) {
	            if ((t /= d / 2) < 1)
	                return c / 2 * t * t * t * t + b;
	            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	        },
	        easeInOutQuint: function (t, b, c, d) {
	            if ((t /= d / 2) < 1)
	                return c / 2 * t * t * t * t * t + b;
	            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	        },
	        easeInOutSine: function (t, b, c, d) {
	            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	        },
	        easeInOutExpo: function (t, b, c, d) {
	            if (t == 0)
	                return b;
	            if (t == d)
	                return b + c;
	            if ((t /= d / 2) < 1)
	                return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	        },
	        easeInOutCirc: function (t, b, c, d) {
	            if ((t /= d / 2) < 1)
	                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	        },
	        easeInElastic: function (t, b, c, d) {
	            var s = 1.70158;
	            var p = 0;
	            var a = c;
	            if (t == 0)
	                return b;
	            if ((t /= d) == 1)
	                return b + c;
	            if (!p)
	                p = d * .3;
	            if (a < Math.abs(c)) {
	                a = c;
	                var s = p / 4;
	            }
	            else
	                var s = p / (2 * Math.PI) * Math.asin(c / a);
	            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	        },
	        easeOutElastic: function (t, b, c, d) {
	            var s = 1.70158;
	            var p = 0;
	            var a = c;
	            if (t == 0)
	                return b;
	            if ((t /= d) == 1)
	                return b + c;
	            if (!p)
	                p = d * .3;
	            if (a < Math.abs(c)) {
	                a = c;
	                var s = p / 4;
	            }
	            else
	                var s = p / (2 * Math.PI) * Math.asin(c / a);
	            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	        },
	        easeInOutElastic: function (t, b, c, d) {
	            var s = 1.70158;
	            var p = 0;
	            var a = c;
	            if (t == 0)
	                return b;
	            if ((t /= d / 2) == 2)
	                return b + c;
	            if (!p)
	                p = d * (.3 * 1.5);
	            if (a < Math.abs(c)) {
	                a = c;
	                var s = p / 4;
	            }
	            else
	                var s = p / (2 * Math.PI) * Math.asin(c / a);
	            if (t < 1)
	                return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	        },
	        easeInOutBack: function (t, b, c, d, s) {
	            if (s == undefined)
	                s = 1.70158;
	            if ((t /= d / 2) < 1)
	                return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
	            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	        },
	    };
	});
	//# sourceMappingURL=easing.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/angularjs/angular.d.ts" />
	/// <reference path="../typings/d3/d3.d.ts" />
	"use strict";
	var statevis_module_1 = __webpack_require__(2);
	/**
	 * This service watches for state lifecycle (added/removed).  It maintains an array of states (wrapped as nodes).
	 * When transitions occur, it applies transition metadata to the nodes.
	 */
	statevis_module_1.app.service("uirStateVisService", function ($state, $interval) {
	    var nodes = [];
	    var nodeForState = function (state) { return nodes.filter(function (node) { return node.name === state.name; })[0]; };
	    var pollStates = function () {
	        var all = $state.get().map(function (s) { return s.$$state(); });
	        var known = nodes.map(Object.getPrototypeOf);
	        var toAdd = all.filter(function (s) { return known.indexOf(s) === -1; });
	        var toDel = known.filter(function (s) { return all.indexOf(s) === -1; });
	        if (toAdd.length || toDel.length) {
	            toAdd.map(function (s) { return Object.create(s); }).forEach(function (n) { return nodes.push(n); });
	            // todo: del.forEach(blah)
	            // Rebuild each node's children array
	            nodes.forEach(function (n) { return n.children = []; });
	            nodes.forEach(function (n) {
	                if (!n || !n.parent)
	                    return;
	                var parentNode = nodeForState(n.parent);
	                if (!parentNode)
	                    return;
	                parentNode.children.push(n);
	                n._parent = parentNode;
	            });
	        }
	    };
	    pollStates();
	    var cancel = $interval(pollStates, 1000);
	    return {
	        nodeForState: nodeForState,
	        nodes: nodes,
	        cancel: cancel
	    };
	});
	statevis_module_1.app.run(function ($rootScope, $injector, uirStateVisService) {
	    var nodes = uirStateVisService.nodes;
	    var nodeForState = uirStateVisService.nodeForState;
	    var $transitions = $injector.get("$transitions");
	    var resetMetadata = {
	        label: '',
	        highlight: false,
	        active: false,
	        retained: false,
	        entered: false,
	        exited: false,
	        inactive: true
	    };
	    var applyClasses = function (node) {
	        var classes = ["entered", "retained", "exited", "active", "inactive", "highlight"];
	        node._classes = classes.reduce(function (str, clazz) { return (str + (node[clazz] ? " " + clazz + " " : '')); }, '');
	    };
	    if ($transitions) {
	        $transitions.onSuccess({}, function ($transition$) {
	            var tc = $transition$.treeChanges();
	            var getNode = function (node) { return nodeForState(node.state); };
	            nodes.forEach(function (n) { return angular.extend(n, resetMetadata); });
	            tc.retained.concat(tc.entering).map(getNode).forEach(function (n) { return n.entered = true; });
	            tc.retained.map(getNode).forEach(function (n) { return n.retained = true; });
	            tc.exiting.map(getNode).forEach(function (n) { return n.exited = true; });
	            tc.to.slice(-1).map(getNode).forEach(function (n) { n.active = true; n.label = "active"; });
	            nodes.forEach(applyClasses);
	        });
	    }
	    else {
	        $rootScope.$on("$stateChangeSuccess", function (evt, toState, toParams) {
	            nodes.forEach(function (n) { return angular.extend(n, resetMetadata); });
	            nodeForState(toState).active = true;
	        });
	    }
	});
	//# sourceMappingURL=service.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var statevis_module_1 = __webpack_require__(2);
	var angular_ui_router_1 = __webpack_require__(8);
	///////////////////////////////////////////////////////////
	// These two directives make up the Transition Visualizer
	///////////////////////////////////////////////////////////
	statevis_module_1.app.value("uirTransitionsViewConfig", { MAX_TRANSITIONS: 15 });
	/**
	 * This outer directive manages the list of all transitions (history), and provides a fixed, scrolling viewport.
	 * It attaches hooks for lifecycle events and decorates the transition with a descriptive message.
	 */
	statevis_module_1.app.directive('uirTransitionsView', function ($transitions, $timeout, d3ng, easing, uirTransitionsViewConfig) {
	    return {
	        restrict: "E",
	        controller: function ($scope, $element) {
	            var later = function (fn, delay) { return function () { return $timeout(fn, delay); }; };
	            function setMessage($transition$, message) {
	                $transition$['_message'] = message;
	            }
	            $scope.transitions = [];
	            $scope.toggles = [];
	            $transitions.onBefore({}, function ($transition$) {
	                $scope.transitions.push($transition$);
	                $scope.toggles.push({ expand: false, showDetail: false });
	                var statename = function (state) { return state.name || "(root)"; };
	                $transition$.onStart({}, function () { return setMessage($transition$, "Starting..."); }, { priority: 10000 });
	                $transition$.onExit({}, function ($state$) { return setMessage($transition$, "Exiting " + statename($state$)); }, { priority: 10000 });
	                $transition$.onRetain({}, function ($state$) { return setMessage($transition$, "Retained " + statename($state$)); }, { priority: 10000 });
	                $transition$.onEnter({}, function ($state$) { return setMessage($transition$, "Entering " + statename($state$)); }, { priority: 10000 });
	                $transition$.onFinish({}, function () { return setMessage($transition$, "Finishing..."); });
	                var cleanup = function () { return delete $transition$['_message']; };
	                $transition$.promise.then(cleanup, cleanup);
	            });
	            this.fullScreen = function (toggle) {
	                $element.toggleClass("fullScreen", toggle);
	            };
	            var cancelPreviousAnim, duration = 750, el = $element[0].children[0].children[0];
	            var scrollToRight = function () {
	                var targetScrollX = el.scrollWidth - el.clientWidth;
	                cancelPreviousAnim && cancelPreviousAnim();
	                var newVal = [targetScrollX], oldVal = [el.scrollLeft];
	                var enforceMax = function () { return [$scope.transitions, $scope.toggles].forEach(function (arr) { while (arr.length > uirTransitionsViewConfig.MAX_TRANSITIONS)
	                    arr.shift(); }); };
	                var callback = function (vals) { return el.scrollLeft = vals[0]; };
	                cancelPreviousAnim = d3ng.animatePath(newVal, oldVal, duration, callback, enforceMax, easing.easeInOutCubic);
	            };
	            $scope.$watchCollection("transitions", later(scrollToRight, 0));
	        },
	        template: "\n      <div>\n        <div class=\"transitionHistory\">\n          <uir-transition-view transition=\"transition\" toggles=\"toggles[$index]\" ng-repeat=\"transition in transitions track by transition.$id\"></uir-transition-view>\n          <div style=\"min-width: 18em; border: 1px solid transparent;\"></div>\n        </div>\n      </div>\n    "
	    };
	});
	/** This directive visualizes a single transition object. It changes visualization as the transition runs. */
	statevis_module_1.app.directive('uirTransitionView', function () {
	    // Icons in the breadcrumb/arrow based on the transition status
	    var iconClasses = {
	        running: 'fa fa-spin fa-spinner',
	        success: 'fa fa-check',
	        redirected: 'fa fa-share',
	        ignored: 'fa fa-circle-o',
	        error: 'fa fa-close'
	    };
	    return {
	        restrict: "E",
	        require: ['^uirTransitionsView', 'uirTransitionDetail'],
	        scope: {
	            trans: '=transition',
	            toggles: '='
	        },
	        bindToController: true,
	        controllerAs: "vm",
	        controller: (function () {
	            function UirTransitionView() {
	                this.status = "running";
	                this.tc = this.trans.treeChanges();
	                var paths = angular.extend({}, this.tc);
	                // Ignore the root state when drawing paths.
	                ["entering", "exiting", "retained"]
	                    .forEach(function (key) { return paths[key] = paths[key].filter(function (node) { return !!node.state.name; }); });
	                paths.exiting.reverse();
	                this.paths = paths.retained
	                    .map(function (node) { return ({ to: node, toType: 'retain', from: node, fromType: 'retain' }); });
	                var count = Math.max(paths.exiting.length, paths.entering.length);
	                for (var i = 0; i < count; i++) {
	                    this.paths.push({
	                        to: paths.entering[i],
	                        toType: paths.entering[i] && 'enter',
	                        from: paths.exiting[i],
	                        fromType: paths.exiting[i] && 'exit'
	                    });
	                }
	                var paramsForNode = function (node) {
	                    return Object.keys(node.paramValues)
	                        .map(function (key) { return ({ state: node.state.name, key: key, value: node.paramValues[key] }); });
	                };
	                this.params = this.trans.treeChanges().to
	                    .map(paramsForNode)
	                    .reduce(function (memo, array) { return memo.concat(array); }, [])
	                    .filter(function (param) { return param.key !== '#' || !!param.value; });
	                this.paramsMap = this.params.reduce((function (obj, param) {
	                    obj[param.key] = param.value;
	                    return obj;
	                }), {});
	                this.trans.promise.then(this.success.bind(this), this.reject.bind(this));
	            }
	            // Makes the widget take up the entire screen, via position: fixed
	            UirTransitionView.prototype.fullScreen = function (toggle) {
	                return this.toggles.fullscreen = toggle;
	            };
	            // Provides the icon class to the view
	            UirTransitionView.prototype.iconClass = function () {
	                return iconClasses[this.status];
	            };
	            UirTransitionView.prototype.success = function () {
	                return this.status = "success";
	            };
	            UirTransitionView.prototype.reject = function (rejection) {
	                this.status = "error";
	                if (rejection) {
	                    this.rejection = rejection && rejection.message;
	                    var type = rejection && rejection.type;
	                    if (type == 2) {
	                        this.status = "redirected";
	                        //this.rejection = rejection.detail;
	                        var toState = rejection.detail.name();
	                        var toParams = JSON.stringify(rejection.detail.params());
	                        this.rejection = truncateTo(100, toState + "(" + toParams) + ")";
	                    }
	                    if (type == 5) {
	                        this.status = "ignored";
	                        this.rejection = "All states and parameters in the To and From paths are identical.";
	                    }
	                    console.log(rejection);
	                }
	            };
	            ;
	            return UirTransitionView;
	        }()),
	        template: "\n      <div ng-mouseover=\"vm.toggles.showDetail = true\" ng-mouseout=\"vm.toggles.showDetail = false\">\n        <div ng-show=\"vm.toggles.showDetail || vm.toggles.pin || vm.toggles.fullscreen\" ng-class=\"vm.toggles\" class=\"transitionDetail uir-panel panel-default\">\n\n          <div class=\"uir-panel-heading uir-header\">\n            <button class=\"btn btn-default btn-xs pinButton\" ng-click=\"vm.toggles.pin = !vm.toggles.pin\">\n              <i class=\"fa fa-thumb-tack\" ng-class=\"{ 'fa-rotate-45 text-muted': !vm.toggles.pin }\"></i>\n            </button>\n\n            <h3 class=\"uir-panel-title\">Transition #{{::vm.trans.$id}}</h3>\n\n            <div style=\"cursor: pointer;\" ng-click=\"vm.toggles.expand = !vm.toggles.expand\">\n              <i class=\"tooltip-right fa\" title=\"Show Details\" ng-class=\"{ 'fa-toggle-off': !vm.toggles.expand, 'fa-toggle-on': vm.toggles.expand }\"></i>\n            </div>\n          </div>\n\n          <div class=\"uir-panel-body\">\n            <table class=\"summary\">\n              <tr><td>From State:</td><td>{{::vm.trans.from().name || '(root)'}}</td></tr>\n              <tr><td>To State:</td><td>{{::vm.trans.to().name || '(root)'}}</td></tr>\n              <tr>\n                <td colspan=\"1\">Parameters:</td>\n                <td colspan=\"1\">\n                  <div keys-and-values=\"::vm.paramsMap\"\n                      labels=\"{ section: '', modalTitle: 'Parameter value: ' }\"\n                      classes=\"{ outerdiv: '', keyvaldiv: 'keyvalue', section: '', key: '', value: '' }\">\n                  </div>\n                </td>\n              </tr>\n\n              <tr><td>Outcome:</td><td>{{vm.status}}<span ng-show=\"vm.rejection\">: {{vm.rejection}}</span></td></tr>\n            </table>\n\n            <hr/>\n\n            <table class=\"paths\">\n\n              <thead>\n                <tr><th>From Path</th><th>To Path</th></tr>\n              </thead>\n\n              <tbody>\n                <tr ng-repeat=\"elem in ::vm.paths\">\n                  <!--<td ng-show=\"elem.fromType == 'retain'\" colspan=\"2\" ng-class=\"elem.fromType\" uir-transition-node-detail node=\"elem.from\" type=\"elem.fromType\"></td>-->\n                  <td ng-class=\"::elem.fromType\" uir-transition-node-detail node=\"::elem.from\" type=\"::elem.fromType\"></td>\n                  <td ng-class=\"::elem.toType\" uir-transition-node-detail node=\"::elem.to\" type=\"::elem.toType\"></td>\n                </tr>\n              </tbody>\n\n            </table>\n          </div>\n\n          <div class=\"downArrow\"></div>\n\n        </div>\n\n        <div class=\"historyEntry\" ng-class=\"vm.status\" style=\"cursor: pointer\" ng-click=\"vm.toggles.expand = !vm.toggles.expand\">\n          <div class=\"summary\">\n            <div class=\"transid\">{{::vm.trans.$id}}</div>\n            <div class=\"status\">{{vm.status}}<span ng-show=\"vm.trans._message\">: {{vm.trans._message}}</span> </div>\n            <div class=\"transname\">\n              <i ng-class=\"vm.iconClass()\"></i>\n              {{::vm.trans.to().name}}\n              </div>\n          </div>\n        </div>\n\n      </div>\n    "
	    };
	});
	statevis_module_1.app.directive('uirTransitionNodeDetail', function () { return ({
	    restrict: 'A',
	    scope: {
	        node: '=',
	        type: '='
	    },
	    bindToController: true,
	    controllerAs: 'vm',
	    controller: function ($scope) {
	        var _this = this;
	        this.stateName = function (node) {
	            var name = node && node.state && node.state.name;
	            if (name === "")
	                name = "(root)";
	            return name && name.split(".").reverse()[0];
	        };
	        $scope.$watch(function () { return _this.node; }, function (node, oldval) {
	            if (!node)
	                return;
	            _this.params = node.paramSchema.reduce(function (params, param) {
	                params[param.id] = node.paramValues[param.id];
	                return params;
	            }, {});
	        });
	        var getResolvables = memoDebounce(500, function () {
	            return _this.node && _this.node.resolvables
	                .filter(function (r) { return r.token !== '$stateParams' && r.token !== '$transition$' && r.token !== '$resolve$'; });
	        });
	        this.unwrapResolve = function (resolve) {
	            return resolve.data;
	        };
	        $scope.$watchCollection(getResolvables, function (keys, oldval) {
	            _this.resolves = (keys || []).reduce((function (resolves, r) {
	                var token = r.token;
	                if (typeof token !== 'string') {
	                    token = angular_ui_router_1.maxLength(30, angular_ui_router_1.stringify(token));
	                }
	                resolves[token] = r;
	                return resolves;
	            }), {});
	        });
	    },
	    template: "\n    <div ng-if=\"::vm.type\">\n      <div class=\"uir-header\">\n        <div class=\"nowrap deemphasize\">({{::vm.type}} state)</div>\n        <div class=\"statename\">{{::vm.stateName(vm.node)}}</div>\n      </div>\n\n      <div keys-and-values=\"vm.params\"\n          classes=\"{ outerdiv: 'params', section: 'paramslabel deemphasize' }\"\n          labels=\"{ section: 'Parameter values', modalTitle: 'Parameter value: ' }\">\n      </div>\n\n      <div keys-and-values=\"vm.resolves\" getvalue=\"vm.unwrapResolve(value)\"\n          classes=\"{ outerdiv: 'params resolve', section: 'resolvelabel deemphasize' }\"\n          labels=\"{ section: 'Resolved data', modalTitle: 'Resolved value: ' }\">\n      </div>\n    </div>\n  "
	}); });
	statevis_module_1.app.directive("keysAndValues", function () {
	    return {
	        restrict: 'AE',
	        scope: {
	            keysAndValues: '=',
	            getvalue: '&?',
	            classes: '=',
	            labels: '=' // Apply labels to specific elements, e.g., { section: 'Param values', modalTitle: 'Parameter value: ' }
	        },
	        controller: function ($scope) {
	            // Default CSS class values
	            var _classes = { outerdiv: 'param', keyvaldiv: 'keyvalue', section: 'paramslabel deemphasize', key: 'paramid', value: 'paramvalue' };
	            $scope._classes = angular.extend(_classes, $scope.classes);
	            $scope.toggles = {
	                modal: null // Toggle display of a modal for a particular value
	            };
	            // Unwraps the value using the bound unwrapValue function
	            $scope.unwrap = function (value) { return $scope.getvalue ? $scope.getvalue({ value: value }) : value; };
	            $scope.empty = function () { return Object.keys($scope.keysAndValues || {}).length == 0; };
	            $scope.isObject = function (object) {
	                return object && !angular.isString(object) && !angular.isNumber(object) && object !== true && object !== false;
	            };
	            // Render various types of objects differently
	            $scope.displayValue = function (object) {
	                if (object === undefined)
	                    return "undefined";
	                if (object === null)
	                    return "null";
	                if (angular.isString(object))
	                    return '"' + truncateTo(100, object) + '"';
	                if ($scope.isObject(object))
	                    return "[Object]";
	                if (typeof object.toString === 'function')
	                    return truncateTo(100, object.toString());
	                return object;
	            };
	        },
	        template: "\n      <div ng-class=\"::_classes.outerdiv\" ng-if=\"!empty()\">\n        <div ng-class=\"::_classes.section\">{{::labels.section}}</div>\n\n        <div ng-repeat=\"(key, value) in keysAndValues\" ng-class=\"::_classes.keyvaldiv\">\n\n          <div ng-class=\"::_classes.key\">{{::key}}: </div>\n\n          <div ng-if=\"!isObject(unwrap(value))\" ng-class=\"::_classes.value\">\n            <!-- The value  is a simple string, int, boolean -->\n            {{ displayValue(unwrap(value)) }}\n          </div>\n\n          <div ng-if=\"isObject(unwrap(value))\" ng-class=\"::_classes.value\">\n            <!-- The value is an Object. Allow user to click a link titled [Object] to show a modal containing the object as JSON -->\n\n            <simple-modal size=\"lg\" as-modal=\"true\" ng-if=\"toggles.modal == key\">\n              <div class=\"uir-modal-header\" style=\"display: flex; flex-flow: row nowrap; justify-content: space-between; background-color: cornflowerblue\">\n                <div style=\"font-size: 1.5em;\">{{::labels.modalTitle}}: {{ ::key }}</div>\n                <button class=\"btn btn-primary\" ng-click=\"toggles.modal = null\"><i class=\"fa fa-close\"></i></button>\n              </div>\n\n              <div class=\"uir-modal-body\" style=\"max-height: 80%;\">\n                <pre style=\"max-height: 50%\">{{ ::unwrap(value) | json }}</pre>\n              </div>\n\n              <div class=\"uir-modal-footer\"><button class=\"btn btn-primary\" ng-click=\"toggles.modal = null\">Close</button></div>\n            </simple-modal>\n\n            <span>\n              <span class=\"link\" ng-click=\"toggles.modal = key\">[Object]</span>\n            </span>\n\n          </div>\n        </div>\n      </div>\n      "
	    };
	});
	statevis_module_1.app.directive("simpleModal", function ($timeout) {
	    return {
	        restrict: 'AE',
	        transclude: true,
	        require: ["^?uirTransitionsView", "^?uirTransitionView"],
	        scope: {
	            size: '@',
	            asModal: '='
	        },
	        link: function (scope, elem, attrs, controllers) {
	            $timeout(function () { return elem.children().addClass("in"); }, 10);
	            controllers = controllers.filter(function (x) { return !!x; });
	            controllers.forEach(function (ctrl) { return ctrl.fullScreen(true); });
	            scope.$on("$destroy", function () { return controllers.forEach(function (ctrl) { return ctrl.fullScreen(false); }); });
	        },
	        template: "\n        <div ng-class=\"{'uir-modal-backdrop uir-fade': asModal}\" style=\"z-index: 1040;\"> </div>\n\n        <div tabindex=\"-1\" ng-class=\"{'uir-modal uir-fade': asModal}\" style=\"z-index: 1050; display: block;\">\n          <div ng-class=\"{'uir-modal-dialog': asModal}\" ng-class=\"{ 'modal-sm': size == 'sm', 'modal-lg': size == 'lg' }\">\n            <div ng-class=\"{'uir-modal-content': asModal}\" ng-transclude></div>\n          </div>\n        </div>\n      "
	    };
	});
	function truncateTo(len, str) {
	    return str.length > len ? str.substr(0, len - 3) + "..." : str;
	}
	function memoDebounce(ms, fn) {
	    var memo, last = 0;
	    return function () {
	        if (Date.now() - last > ms) {
	            memo = fn.apply(null, arguments);
	            last = Date.now();
	        }
	        return memo;
	    };
	}
	//# sourceMappingURL=uirTransitionView.js.map

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var statevis_module_1 = __webpack_require__(2);
	statevis_module_1.app.directive('uirStateNode', function (d3ng) {
	    return {
	        restrict: "A",
	        scope: {
	            node: "=state",
	            parent: "="
	        },
	        require: "^uirStateVis",
	        link: function (scope, elem, attr, uirStateVis) {
	            scope.radius = uirStateVis.radius;
	            var makeLinkPath = function (node, parent) {
	                var _a = [node, parent], s = _a[0], p = _a[1];
	                var yAvg = (s._y + p._y) / 2;
	                return "M " + s._x + " " + s._y + " C " + s._x + " " + yAvg + ", " + p._x + " " + yAvg + ", " + p._x + " " + p._y;
	            };
	            var cancelCurrentAnimation = angular.noop;
	            function xyValsUpdated(newXyVals) {
	                cancelCurrentAnimation();
	                var transformX = function (xval) { return xval * uirStateVis.scaleX + uirStateVis.offsetX; };
	                var transformY = function (yval) { return yval * uirStateVis.scaleY + uirStateVis.offsetY; };
	                var node = scope.node, parent = scope.parent;
	                var currentCoords = [node._x || uirStateVis.width / 2, node._y || uirStateVis.height / 2];
	                var targetCoords = [transformX(newXyVals[0]), transformY(newXyVals[1])];
	                function animationFrame(xyValArray) {
	                    var x = xyValArray[0], y = xyValArray[1];
	                    node._x = x;
	                    node._y = y;
	                    if (parent && angular.isDefined(parent._x))
	                        node._linkPath = makeLinkPath(node, parent);
	                }
	                cancelCurrentAnimation = d3ng.animatePath(targetCoords, currentCoords, 800, animationFrame);
	            }
	            scope.$watchGroup(["node.x", "node.y", "parent.x", "parent.y"], xyValsUpdated);
	        },
	        template: "\n      <path ng-if=\"node._linkPath\" ng-attr-d='{{node._linkPath}}' class=\"link\"/>\n\n      <circle class=\"{{node._classes}}\" r=\"10\" ng-attr-cx=\"{{node._x}}\" ng-attr-cy=\"{{node._y}}\"></circle>\n      <path class=\"{{node._classes}}\" r=\"10\" ng-attr-cx=\"{{node._x}}\" ng-attr-cy=\"{{node._y}}\"></path>\n\n      <text class=\"name\" text-anchor=\"middle\"\n          ng-attr-transform=\"rotate(-12 {{node._x}} {{node._y}})\"\n          ng-attr-x=\"{{node._x}}\" ng-attr-y=\"{{node._y - radius}}\">\n          {{node.name | lastDottedSegment}}\n      </text>\n\n      <text class=\"label\" text-anchor=\"middle\" ng-attr-x=\"{{node._x}}\" ng-attr-y=\"{{node._y + radius + 10}}\">\n          {{node.label}}\n      </text>\n    "
	    };
	});
	//# sourceMappingURL=uirStateNode.js.map

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var statevis_module_1 = __webpack_require__(2);
	statevis_module_1.app.filter("lastDottedSegment", function () { return function (word) { return word.split(".").slice(-1)[0]; }; });
	statevis_module_1.app.directive('uirStateVis', function (uirStateVisService) { return ({
	    restrict: "E",
	    scope: true,
	    controllerAs: 'vis',
	    bindToController: {
	        radius: "@",
	        scaleX: "@",
	        scaleY: "@",
	        offsetX: "@",
	        offsetY: "@",
	        width: "@",
	        height: "@"
	    },
	    controller: function ($state, $scope) {
	        var _this = this;
	        this.nodes = uirStateVisService.nodes;
	        this.radius = this.radius || 15;
	        this.offsetX = this.offsetX || 0;
	        this.offsetY = this.offsetY || this.radius * 2;
	        this.height = this.height || 500;
	        this.width = this.width || 500;
	        this.scaleX = this.scaleX || (this.width - this.offsetX * 2);
	        this.scaleY = this.scaleY || (this.height - this.offsetY * 2);
	        var tree = d3.layout.tree();
	        var doLayout = function () {
	            var root = _this.nodes.filter(function (state) { return state.name === ""; })[0];
	            tree(root);
	        };
	        $scope.$watchCollection(function () { return _this.nodes; }, doLayout);
	    },
	    template: "\n      <svg ng-attr-width=\"{{vis.width}}\" ng-attr-height=\"{{vis.height}}\">\n        <g uir-state-node ng-repeat=\"node in vis.nodes | orderBy: '-y' track by node.name \" state=\"node\" parent=\"node._parent\"></g>\n      </svg>\n    "
	}); });
	//# sourceMappingURL=uirStateVis.js.map

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var statevis_module_1 = __webpack_require__(2);
	statevis_module_1.app.directive('uirStateVisContainer', function (uirStateVisService) { return ({
	    restrict: 'E',
	    controllerAs: 'vm',
	    controller: function ($element) {
	        var _this = this;
	        //$element = $element.children();
	        var el = $element[0].children[0];
	        this.minimize = function (evt) {
	            evt && evt.preventDefault();
	            evt && evt.stopPropagation();
	            var bounds = el.getBoundingClientRect();
	            el.style.top = el.style.left = "auto";
	            el.style.right = _this.right = (window.innerWidth - bounds.right);
	            el.style.bottom = _this.bottom = (window.innerHeight - bounds.bottom);
	            var unminimize = function () {
	                el.style.top = el.style.left = "auto";
	                el.style.right = _this.right;
	                el.style.bottom = _this.bottom;
	                $element.children().toggleClass("minimized", false);
	                $element.off("click", unminimize);
	                _this.minimized = false;
	            };
	            $element.children().toggleClass("minimized", true);
	            $element.on("click", unminimize);
	            // wait 50ms to avoid coordinates jumping directly to 0/0 and avoid animation
	            setTimeout(function () { return el.style.right = el.style.bottom = "0"; }, 50);
	            _this.minimized = true;
	        };
	        setTimeout(function () { return _this.minimize(); }, 1000);
	    },
	    template: "\n    <div class=\"uirStateVisContainer\" draggable=\"!vm.minimized\">\n      <div style=\"width: 100%; display: flex; flex-flow: row nowrap; justify-content: space-between\">\n        <div> Current State: <state-selector></state-selector></div>\n        <button ng-click=\"vm.minimize($event)\"><i class=\"fa fa-chevron-down\" style=\"cursor: pointer\"></i></button>\n      </div>\n      <uir-state-vis style=\"flex: 1 0 auto\" class=\"statevis\" width=\"350\" height=\"250\"></uir-state-vis>\n    </div>\n"
	}); });
	//# sourceMappingURL=uirStateVisContainer.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var statevis_module_1 = __webpack_require__(2);
	statevis_module_1.app.directive("stateSelector", function () {
	    return {
	        restrict: "E",
	        template: '  <select ng-model="sel.currentstate" ng-change="sel.go(sel.currentstate);" ' +
	            '    ng-options="state as state.name for state in sel.$state.get()">' +
	            '     <option value="">Choose a state</option>' +
	            '  </select>',
	        controller: function ($scope, $state, $injector) {
	            var _this = this;
	            this.$state = $state;
	            this.go = function (state) {
	                return $state.go(state);
	            };
	            var updateCurrentState = function () { return _this.currentstate = $state.current; };
	            var $transitions = $injector.get("$transitions");
	            if ($transitions) {
	                $transitions.onBefore({}, function ($transition$) { $transition$.promise.finally(updateCurrentState); });
	            }
	            else {
	                $scope.$on("$stateChangeSuccess", updateCurrentState);
	                $scope.$on("$stateChangeError", updateCurrentState);
	            }
	        },
	        controllerAs: "sel"
	    };
	});
	//# sourceMappingURL=stateSelector.js.map

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(16)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./transitionHistory.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./transitionHistory.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(15)();
	// imports


	// module
	exports.push([module.id, "/*\n    .transitionHistory is the breadcrumbs and transition details block.\n    It fills the footer of the screen, and scrolls horizontally.\n    Mouse clicks should pass through to the elements underneath.\n*/\n\n.transitionHistory {\n    display: flex;\n    align-items: flex-end;\n    position: fixed;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    padding: 0 1em;\n    overflow-x: scroll;\n    z-index: 2;\n    /* disable mouse clicks, hover, etc, for the overall div */\n    pointer-events: none;\n}\n\n.transitionHistory * {\n    /* Enable mouse for any sub-elements (the breadcrumb elemetns and detail elements) */\n    pointer-events: all;\n    flex: 0 0 auto;\n}\n\n/*  workaround for modal screen, and chrome and safari not allowing it to be\n    visible outside the .transitionHistory overflow while the .transitionHistory div is scrolled */\n.fullScreen .transitionHistory {\n    top: 0;\n}\n\n/* A single history entry (breadcrumb) arrow looking thing */\n.transitionHistory .historyEntry {\n    position: relative;\n    text-align: center;\n    padding: 12px 30px;\n    margin-bottom: 6px;\n    margin-right: 6px;\n    color: #000;\n}\n\n\n/* History entry arrow CSS */\n.transitionHistory .historyEntry:before,.historyEntry:after {\n    content: '';\n    position: absolute;\n    background: darkgrey;\n    left: 0;\n    height: 50%;\n    width: 100%;\n    border: 1px solid black;\n    z-index: -1;\n}\n\n.transitionHistory .historyEntry:before {\n    top: 0;\n    border-bottom: 0;\n    -webkit-transform: skew(40deg, 0deg);\n    -ms-transform: skew(40deg, 0deg);\n    transform: skew(40deg, 0deg);\n}\n\n.transitionHistory .historyEntry:after {\n    bottom: 0;\n    border-top: 0;\n    -webkit-transform: skew(-40deg, 0deg);\n    -ms-transform: skew(-40deg, 0deg);\n    transform: skew(-40deg, 0deg);\n}\n\n/*.historyEntry::before height: 51% (|| ::after) */\n\n/* Styling for breadcrumb contents */\n.historyEntry .summary {\n    color: white;\n    white-space: nowrap;\n    font-size: small;\n}\n\n.historyEntry .summary .transid {\n    position: absolute;\n    top: 0.1em;\n    left: 0.85em;\n    font-size: smaller;\n}\n\n.historyEntry .summary .status {\n    position: absolute;\n    bottom: 0.1em;\n    left: 0.85em;\n    font-size: smaller;\n}\n.historyEntry .summary .transname {\n    font-weight: bold;\n}\n\n/* breadcrumb/history entry color coding */\n.transitionHistory .historyEntry:before,.historyEntry:after {\n    background: #737373;\n}\n.transitionHistory .historyEntry:hover:before,.historyEntry:hover:after {\n    background: #a6a6a6;\n}\n\n.transitionHistory .historyEntry.success:before,.historyEntry.success:after {\n    background: #45803b;\n}\n.transitionHistory .historyEntry.success:hover:before,.historyEntry.success:hover:after {\n    background: #19a600;\n}\n\n\n.transitionHistory .historyEntry.error:before,.historyEntry.error:after {\n    background: #bf1f1d;\n}\n.transitionHistory .historyEntry.error:hover:before,.historyEntry.error:hover:after {\n    background: #e62622;\n}\n\n\n.transitionHistory .historyEntry.ignored:before,.historyEntry.ignored:after {\n    background: #e68b05;\n}\n.transitionHistory .historyEntry.ignored:hover:before,.historyEntry.ignored:hover:after {\n    background: #ff9808;\n}\n\n.transitionHistory .historyEntry.redirected:before,.historyEntry.redirected:after {\n    background: #e68b05;\n}\n.transitionHistory .historyEntry.redirected:hover:before,.historyEntry.redirected:hover:after {\n    background: #ff9808;\n}\n\n.transitionHistory .keyvalue {\n    display: flex;\n    flex-flow: row nowrap;\n    justify-content: space-between;\n}\n\n\n\n\n\n\n\n/* The transition detail popover (when hovering over a breadcrumb) */\n.transitionDetail {\n    border: 1px solid lightgrey;\n    font-size: small;\n    transition: box-shadow 0.5s ease,  border 1.0s ease\n}\n\n/* Pointer element points from the transitionDetail to the breadcrumb */\n.transitionDetail .downArrow {\n    position: relative;\n    width: 100%;\n    bottom: -10px;\n    margin-bottom: 10px;\n}\n\n.transitionDetail .downArrow:before, .transitionDetail .downArrow:after {\n    content: \"\";\n    position: absolute;\n    border-left: 10px solid transparent;\n    border-right: 10px solid transparent;\n    top: 100%;\n    left: 50%;\n    margin-left: -10px;\n}\n\n.transitionDetail .downArrow:before {\n    border-top: 10px solid lightgray;\n}\n\n.transitionDetail .downArrow:after{\n    border-top: 10px solid white;\n    margin-top: -1px;\n    z-index: 1;\n}\n\n\n/* The layout and styling of the transition detail popover */\n.transitionDetail .panel-heading {\n    text-align: center;\n}\n\n.transitionDetail table {\n    border-collapse: collapse;\n}\n\n.transitionDetail th {\n    text-align: center;\n    font-size: small;\n}\n\n.transitionDetail .uir-header {\n    display: flex;\n    flex-flow: row-reverse nowrap;\n    justify-content: space-between;\n    align-items: baseline;\n}\n\n.transitionDetail .uir-header > button {\n    flex: 0 1 auto;\n    transition: transform 0.5s ease;\n}\n.transitionDetail .uir-header > button:hover i {\n    flex: 0 1 auto;\n    transition: all 0.5s ease;\n}\n\n.fa-thumb-tack.fa-rotate-45 {\n    color: lightgray;\n    filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=1);\n    -webkit-transform: rotate(45deg);\n    -ms-transform: rotate(45deg);\n    transform: rotate(45deg);\n}\n\n.transitionDetail table.paths td {\n    color: white;\n    padding: 0.1em 0.5em !important;\n    border: 0;\n    font-size: small;\n    min-width: 10em;\n}\n\n\n.transitionDetail .summary .keyvalue {\n    justify-content: flex-start !important;\n    align-items: baseline;\n}\n\n.transitionDetail .summary .keyvalue > div:nth-child(2){\n    padding-left: 0.5em;\n    font-weight: normal;\n}\n\n\n.transitionDetail table.summary {\n    max-width: 400px;\n}\n\n.transitionDetail table.summary td {\n    font-size: small;\n    vertical-align: top;\n}\n\n.transitionDetail table.summary td:nth-child(1) {\n    white-space: nowrap;\n}\n\n.transitionDetail table.summary td:nth-child(2) {\n    font-weight: bold;\n    padding-left: 1em;\n}\n\n/* color code path elements by retained/exited/entered */\n.transitionDetail td.retain {\n    background-color: #737273;\n}\n\n.transitionDetail td.exit {\n    background-color: #7c1010;\n}\n\n.transitionDetail td.enter {\n    background-color: #31592a;\n}\n\n.transitionDetail .deemphasize {\n    color: #eaeaea;\n    font-size: x-small;\n}\n\n/* Styling for parameter values and resolve values */\n.transitionDetail .params {\n    background-color: rgba(255,255,255,0.15);\n    padding: 0;\n    opacity: 0;\n    overflow: hidden;\n    transition: padding 0.25s ease, max-height 0.25s ease,max-width 0.25s ease, opacity 1s ease;\n    max-height: 0;\n    max-width: 150px;\n}\n\n.transitionDetail.expand .params {\n    display: block;\n    border-radius: 4px;\n    box-shadow: 1px 1px 2px black;\n    padding: 0.5em;\n    max-height: 250px;\n    max-width: 300px;\n    overflow-y: auto;\n    opacity: 1;\n    margin: 0.5em 0;\n}\n\n.transitionDetail.pin {\n    box-shadow: 4px 4px 12px rgba(0,0,0,0.3);\n    border: 1px solid black;\n}\n\n.transitionDetail.pin .downArrow:before {\n    border-top-color: black;\n}\n\n\n/* When showing expanded details, put space between path elements */\n.transitionDetail.expand table.paths td {\n    border: 5px solid white;\n    max-height: 100px;\n    vertical-align: top;\n}\n\n\n\n.transitionDetail .statename {\n    font-weight: bolder;\n    margin-right: 1em;\n}\n\n.transitionDetail .nowrap {\n    white-space: nowrap;\n}\n\n.transitionHistory .paramid {\n    font-weight: bolder;\n    color: #eaeaea;\n    margin-right: 0.5em;\n}\n\n.transitionHistory .paramslabel {\n    color: white;\n    margin-top: -0.5em;\n    text-align: center;\n    font-weight: bold;\n}\n\n.transitionHistory .resolvelabel {\n    color: white;\n    margin-top: -0.5em;\n    text-align: center;\n    font-weight: bold;\n}\n\n.transitionHistory .paramvalue {\n    color: #e6e6e6;\n}\n\n\n\nspan.link {\n    cursor: pointer;\n    text-decoration: underline;\n}\n\n\n.tooltip-right {\n    display: inline;\n    position: relative;\n    transition: all 1.5s ease;\n}\n\n.tooltip-right:after {\n    color: rgba(0,0,0,0);\n    text-decoration: none;\n    transition: all 1.5s ease;\n}\n\n.tooltip-right:hover:after {\n    bottom: 0;\n    color: rgba(0,0,0,0.5);\n    content: attr(title);\n    display: block;\n    position: absolute;\n    white-space: nowrap;\n    font-size: smaller;\n}\n\n.fa.tooltip-right:after {\n    left: 1.5em;\n}\n\n\n\n\n\n\n/* Bootstrap stuff */\n\n.uir-modal .btn-primary {\n    color: #fff;\n    background-color: #337ab7;\n    border-color: #2e6da4;\n}\n\n.uir-modal .btn {\n    display: inline-block;\n    padding: 6px 12px;\n    margin-bottom: 0;\n    font-size: 14px;\n    font-weight: normal;\n    line-height: 1.42857143;\n    text-align: center;\n    white-space: nowrap;\n    vertical-align: middle;\n    -ms-touch-action: manipulation;\n    touch-action: manipulation;\n    cursor: pointer;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n    background-image: none;\n    border: 1px solid transparent;\n    border-radius: 4px;\n}\n\n.uir-modal .btn-xs, .btn-group-xs > .btn {\n    padding: 1px 5px;\n    font-size: 12px;\n    line-height: 1.5;\n    border-radius: 3px;\n}\n\n\n.transitionDetail span.link {\n    color: white;\n}\n\n.transitionHistory *:not(.fa):not(pre) {\n    font-family: Arial, Helvetica, sans-serif;\n}\n\n.transitionDetail .uir-header {\n    display: flex;\n    flex-flow: row-reverse nowrap;\n    justify-content: space-between;\n    align-items: baseline;\n}\n\n.uir-panel {\n    margin-bottom: 20px;\n    background-color: #fff;\n    border: 1px solid lightgrey;\n    border-radius: 4px;\n    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);\n    box-shadow: 0 1px 1px rgba(0, 0, 0, .05);\n}\n\n.uir-panel-heading {\n    color: #333;\n    background-color: #f5f5f5;\n    border-color: #ddd;\n\n    padding: 10px 15px;\n    border-bottom: 1px solid transparent;\n    border-top-left-radius: 3px;\n    border-top-right-radius: 3px;\n}\n\n.uir-panel-title {\n    margin-top: 0;\n    margin-bottom: 0;\n    font-size: 16px;\n    color: inherit;\n}\n\n.uir-panel-body {\n    padding: 15px;\n}\n\n\n\n\n\n/* Styles go here */\n.uir-fade {\n    opacity: 0;\n    -webkit-transition: opacity .15s linear;\n    -o-transition: opacity .15s linear;\n    transition: opacity .15s linear;\n}\n\n.uir-fade.in {\n    opacity: 1;\n}\n\n.uir-modal-backdrop {\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 1040;\n    background-color: #000;\n}\n\n.uir-modal-backdrop.in {\n    filter: alpha(opacity=50);\n    opacity: .5;\n}\n\n.uir-modal {\n    position: fixed;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    z-index: 1050;\n    display: none;\n    overflow-x: hidden;\n    overflow-y: scroll;\n    -webkit-overflow-scrolling: touch;\n    outline: 0;\n}\n\n\n.uir-modal-dialog {\n    position: relative;\n    width: auto;\n    margin: 10px;\n}\n\n.uir-modal-content {\n    position: relative;\n    background-color: #fff;\n    -webkit-background-clip: padding-box;\n    background-clip: padding-box;\n    border: 1px solid #999;\n    border: 1px solid rgba(0, 0, 0, .2);\n    border-radius: 6px;\n    outline: 0;\n    -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);\n    box-shadow: 0 3px 9px rgba(0, 0, 0, .5);\n}\n\n.uir-modal-header {\n    padding: 15px;\n    border-bottom: 1px solid #e5e5e5;\n}\n\n.uir-modal-body {\n    color: black;\n    position: relative;\n    padding: 15px;\n}\n\n.uir-modal-footer {\n    padding: 15px;\n    text-align: right;\n    border-top: 1px solid #e5e5e5;\n}\n", ""]);

	// exports


/***/ },
/* 15 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(18);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(16)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./vis.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./vis.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(15)();
	// imports


	// module
	exports.push([module.id, "\n.uirStateVisContainer {\n    z-index: 2;\n    position: fixed;\n    right: 2em;\n    bottom: 20em;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    background-color: rgba(255, 255, 255, 0.8);\n    transform: scale(1);\n    transform-origin: right bottom;\n    transition: right 0.5s ease-in, bottom 0.5s ease-in, transform 0.5s ease-in;\n}\n\n.uirStateVisContainer.minimized {\n    cursor: pointer;\n    transform: scale(0.25);\n}\n\n.statevis {\n    transition: all 1s ease;\n}\n\n.statevis circle {\n    /*r: 10;*/\n    fill: #fff;\n    stroke: grey;\n    stroke-width: 3px;\n\n    transition-property: r, fill, stroke, stroke-width;\n    transition-duration: 350ms;\n    transition-timing-function: ease-in-out;\n}\n\n.statevis circle.entered {\n    /*r: 10;*/\n    stroke: black;\n    stroke-width: 3px;\n    fill: lightgreen;\n}\n\n.statevis circle.entered:after {\n    content: \"<text>Entered</text>\"\n}\n\n.statevis circle.active {\n    /*r: 15;*/\n    fill: green;\n    stroke: black;\n    stroke-width: 3px;\n}\n\n.statevis text {\n    font: 12px sans-serif;\n}\n\n.statevis .link {\n    fill: none;\n    stroke: #ccc;\n    stroke-width: 2px;\n}\n\n.statevis text.label {\n    fill: grey;\n    font-size: 0.7em;\n}\n\n\n.draggable {\n    cursor: move;\n}\n\n.draggable:hover {\n    outline: 3px solid rgba(0,0,0,0.15)\n}", ""]);

	// exports


/***/ }
/******/ ])
});
;