// https://github.com/resin-io/triangular.js
// http://alexandros.resin.io/angular-d3-svg/
// MIT License https://opensource.org/licenses/MIT
"use strict";
var statevis_module_1 = require("./statevis.module");
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