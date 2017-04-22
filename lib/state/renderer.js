"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var d3_hierarchy_1 = require("d3-hierarchy");
exports.RENDERER_PRESETS = {
    "Tree": { layoutFn: TREE_LAYOUT, sortNodesFn: TOP_TO_BOTTOM_SORT, labelRenderFn: SLANTED_TEXT, edgeRenderFn: TREE_EDGE },
    "Cluster": { layoutFn: CLUSTER_LAYOUT, sortNodesFn: TOP_TO_BOTTOM_SORT, labelRenderFn: SLANTED_TEXT, edgeRenderFn: TREE_EDGE },
    "Radial": { layoutFn: RADIAL_LAYOUT, sortNodesFn: BOTTOM_TO_TOP_SORT, labelRenderFn: RADIAL_TEXT, edgeRenderFn: RADIAL_EDGE },
};
var tree = exports.RENDERER_PRESETS.Tree;
exports.DEFAULT_RENDERER = {
    baseRadius: 10,
    baseFontSize: 12,
    baseStrokeWidth: 2,
    baseNodeStrokeWidth: 2,
    zoom: 1.0,
    layoutFn: tree.layoutFn,
    sortNodesFn: tree.sortNodesFn,
    labelRenderFn: tree.labelRenderFn,
    edgeRenderFn: tree.edgeRenderFn,
};
///////////////////////////////////////////
// NODE RENDER ORDER
///////////////////////////////////////////
function BOTTOM_TO_TOP_SORT(a, b) {
    var b2t = b.layoutY - a.layoutY; // bottom to top
    if (b2t !== 0)
        return b2t;
    var l2r = a.layoutX - b.layoutX; // left to right
    return l2r;
}
exports.BOTTOM_TO_TOP_SORT = BOTTOM_TO_TOP_SORT;
function TOP_TO_BOTTOM_SORT(a, b) {
    var t2b = a.layoutY - b.layoutY; // top to bottom
    if (t2b !== 0)
        return t2b;
    var l2r = a.layoutX - b.layoutX; // left to right
    return l2r;
}
exports.TOP_TO_BOTTOM_SORT = TOP_TO_BOTTOM_SORT;
///////////////////////////////////////////
// LAYOUTS
///////////////////////////////////////////
function TREE_LAYOUT(rootNode) {
    var root = d3_hierarchy_1.hierarchy(rootNode);
    var tree = d3_hierarchy_1.tree();
    return updateNodes(tree(root));
}
exports.TREE_LAYOUT = TREE_LAYOUT;
function CLUSTER_LAYOUT(rootNode) {
    var root = d3_hierarchy_1.hierarchy(rootNode);
    var tree = d3_hierarchy_1.cluster();
    return updateNodes(tree(root));
}
exports.CLUSTER_LAYOUT = CLUSTER_LAYOUT;
/** For RADIAL_LAYOUT: projects x/y coords from a cluster layout to circular layout */
function project(x, y) {
    var angle = (x - 90) / 180 * Math.PI, radius = y;
    var CENTER = 0.5;
    return { x: CENTER + radius * Math.cos(angle), y: CENTER + radius * Math.sin(angle) };
}
function RADIAL_LAYOUT(rootNode) {
    var root = d3_hierarchy_1.hierarchy(rootNode);
    var layout = d3_hierarchy_1.cluster()
        .size([360, 0.4])
        .separation(function (a, b) {
        return (a.parent == b.parent ? 1 : 2) / a.depth;
    });
    var nodes = layout(root);
    nodes.each(function (node) {
        var projected = project(node.x, node.y);
        var visNode = node.data;
        visNode.layoutX = node.x;
        visNode.layoutY = node.y;
        visNode.x = projected.x;
        visNode.y = projected.y;
    });
}
exports.RADIAL_LAYOUT = RADIAL_LAYOUT;
/** Mutates each StateVisNode by copying the new x/y values from the d3 HierarchyPointNode structure */
function updateNodes(nodes) {
    nodes.each(function (node) {
        node.data.layoutX = node.data.x = node.x;
        node.data.layoutY = node.data.y = node.y;
    });
    return nodes;
}
///////////////////////////////////////////
// STATE NAME LABEL
///////////////////////////////////////////
function RADIAL_TEXT(x, y, node, renderer) {
    var baseFontSize = renderer.baseFontSize, zoom = renderer.zoom;
    var fontSize = baseFontSize * zoom;
    var segments = node.name.split(".");
    var name = segments.pop();
    if (name == '**')
        name = segments.pop() + ".**";
    var angle = node.layoutX || 0;
    var textAnchor = (angle < 180 === !!node.children) ? "start" : "end";
    var rotation = (angle < 180 ? angle - 90 : angle + 90);
    var translation = (textAnchor === "start" ? 15 : -15) * zoom;
    var transform = "rotate(" + rotation + "),translate(" + translation + ", 0)";
    return (preact_1.h("text", { className: "name", "text-anchor": textAnchor, transform: transform, "font-size": fontSize },
        " ",
        name,
        " "));
}
exports.RADIAL_TEXT = RADIAL_TEXT;
function SLANTED_TEXT(x, y, node, renderer) {
    var baseRadius = renderer.baseRadius, baseFontSize = renderer.baseFontSize, baseStrokeWidth = renderer.baseStrokeWidth, baseNodeStrokeWidth = renderer.baseNodeStrokeWidth, zoom = renderer.zoom;
    var r = baseRadius * zoom;
    var fontSize = baseFontSize * zoom;
    var segments = node.name.split(".");
    var name = segments.pop();
    if (name == '**')
        name = segments.pop() + ".**";
    var transform = "rotate(-15),translate(0, " + -15 * zoom + ")";
    return (preact_1.h("text", { className: "name", "text-anchor": "middle", transform: transform, "font-size": fontSize },
        " ",
        name,
        " "));
}
exports.SLANTED_TEXT = SLANTED_TEXT;
///////////////////////////////////////////
// GRAPH EDGES
///////////////////////////////////////////
/** Straight line */
function RADIAL_EDGE(node, renderer) {
    var strokeWidth = renderer.baseStrokeWidth * renderer.zoom;
    var makeLinkPath = function (node) {
        var s = { x: node.animX, y: node.animY }; // statevisnode
        var p = { x: node._parent.animX, y: node._parent.animY }; // parent
        return "M" + [s.x, s.y]
            + " " + [p.x, p.y];
    };
    return preact_1.h("path", { d: makeLinkPath(node), "stroke-width": strokeWidth, className: 'link' });
}
exports.RADIAL_EDGE = RADIAL_EDGE;
/** Bezier curve */
function TREE_EDGE(node, renderer) {
    var strokeWidth = renderer.baseStrokeWidth * renderer.zoom;
    var makeLinkPath = function (node) {
        var s = { x: node.animX, y: node.animY }; // statevisnode
        var p = { x: node._parent.animX, y: node._parent.animY }; // parent
        var yAvg = (s.y + p.y) / 2;
        return "M " + s.x + " " + s.y + " C " + s.x + " " + yAvg + ", " + p.x + " " + yAvg + ", " + p.x + " " + p.y;
    };
    return preact_1.h("path", { d: makeLinkPath(node), "stroke-width": strokeWidth, className: 'link' });
}
exports.TREE_EDGE = TREE_EDGE;
//# sourceMappingURL=renderer.js.map