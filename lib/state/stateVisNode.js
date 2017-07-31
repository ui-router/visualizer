"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createStateVisNode(state) {
    var node = Object.create(state);
    Object.defineProperty(node, "visible", {
        get: function () {
            if (this.entered)
                return true;
            var ancestorCollapsed = this._parent && (this._parent.collapsed || !this._parent.visible);
            return !ancestorCollapsed;
        }
    });
    Object.defineProperty(node, "children", {
        get: function () {
            return this._children.filter(function (child) { return child.visible; });
        }
    });
    Object.defineProperty(node, "totalDescendents", {
        get: function () {
            return this._children.reduce(function (acc, child) { return acc + child.totalDescendents; }, this._children.length);
        }
    });
    Object.defineProperty(node, "collapsed", {
        get: function () {
            return !this.entered && this._collapsed && this._children.length;
        }
    });
    return node;
}
exports.createStateVisNode = createStateVisNode;
//# sourceMappingURL=stateVisNode.js.map