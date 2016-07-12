"use strict";
var statevis_module_1 = require("../statevis.module");
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