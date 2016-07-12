"use strict";
var statevis_module_1 = require("../statevis.module");
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