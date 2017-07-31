"use strict";
// https://github.com/resin-io/triangular.js
// http://alexandros.resin.io/angular-d3-svg/
// MIT License https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
var easing_1 = require("./easing");
var d3_interpolate_1 = require("d3-interpolate");
/** This animation code was taken from trangular.js, and is used to interpolate 2 arrays of values using an easing fn */
function animatePath(newValue, oldValue, duration, updateFrame, finishFn, easeFn) {
    if (finishFn === void 0) { finishFn = function () { }; }
    if (easeFn === void 0) { easeFn = easing_1.easing.easeOutElastic; }
    var start = null, interpolate = d3_interpolate_1.interpolateArray(oldValue, newValue);
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
        updateFrame(interpolate(percent));
    };
    requestAnimationFrame(step);
    return function cancel() {
        duration = -1;
    };
}
exports.animatePath = animatePath;
//# sourceMappingURL=animatepath.js.map