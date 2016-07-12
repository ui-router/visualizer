"use strict";
var statevis_module_1 = require("../statevis.module");
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