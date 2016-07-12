"use strict";
var statevis_module_1 = require("../statevis.module");
var angular_ui_router_1 = require("angular-ui-router");
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