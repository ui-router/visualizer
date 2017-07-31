"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasClass = function (classname) { return function (el) {
    return !!new RegExp("\\b" + classname + "\\b").exec(el.className);
}; };
exports.addClass = function (classname) { return function (el) {
    return el.className = el.className + " " + classname;
}; };
exports.removeClass = function (classname) { return function (el) {
    return el.className = el.className.replace(new RegExp("\\b" + classname + "\\b", 'g'), "");
}; };
exports.toggleClass = function (classname) { return function (el) {
    if (exports.hasClass(classname)(el))
        exports.removeClass(classname)(el);
    else
        exports.addClass(classname)(el);
}; };
//# sourceMappingURL=toggleClass.js.map