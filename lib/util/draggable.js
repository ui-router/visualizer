"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var toggleClass_1 = require("./toggleClass");
var moveElement = function (elementToMove) {
    return function _moveElement(elementBeingDragged, event, details) {
        var initialClientX = details.initialClientX, initialClientY = details.initialClientY, lastClientX = details.lastClientX, lastClientY = details.lastClientY, newClientX = details.newClientX, newClientY = details.newClientY;
        var el = elementToMove;
        var bounds = el.getBoundingClientRect();
        var left = bounds.left, top = bounds.top;
        var dx = newClientX - lastClientX;
        var dy = newClientY - lastClientY;
        el.style.right = "auto";
        el.style.bottom = "auto";
        el.style.left = (left + dx) + 'px';
        el.style.top = (top + dy) + 'px';
    };
};
exports.dragActions = {
    move: moveElement,
};
function draggable(el, callback) {
    var enabled = true;
    var isDragging = false;
    var initialClientX = 0, initialClientY = 0;
    var lastClientX = 0, lastClientY = 0;
    var mouseDownListener = function (e) {
        if (!enabled)
            return;
        isDragging = true;
        lastClientX = initialClientX = e.clientX;
        lastClientY = initialClientY = e.clientY;
        var dragListener = function (e) {
            if (!enabled || !isDragging)
                return;
            e.preventDefault();
            var newClientX = e.clientX, newClientY = e.clientY;
            callback(el, e, { initialClientX: initialClientX, initialClientY: initialClientY, lastClientX: lastClientX, lastClientY: lastClientY, newClientX: newClientX, newClientY: newClientY });
            lastClientX = newClientX;
            lastClientY = newClientY;
        };
        var doneDragging = function (e) {
            isDragging = false;
            document.removeEventListener("mousemove", dragListener);
            document.removeEventListener("mouseup", doneDragging);
        };
        document.addEventListener("mousemove", dragListener);
        document.addEventListener("mouseup", doneDragging);
    };
    toggleClass_1.addClass("draggable")(el);
    el.addEventListener("mousedown", mouseDownListener);
    return function () { return el.removeEventListener("mousedown", mouseDownListener); };
}
exports.draggable = draggable;
//# sourceMappingURL=draggable.js.map