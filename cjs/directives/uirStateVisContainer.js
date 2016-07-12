"use strict";
var statevis_module_1 = require("../statevis.module");
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