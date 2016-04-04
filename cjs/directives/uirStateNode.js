"use strict";
var statevis_module_1 = require("../statevis.module");
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