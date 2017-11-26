import { h } from "preact";
import { Renderer } from "./interface";
import { hierarchy, cluster as d3cluster, tree as d3tree, HierarchyPointNode } from "d3-hierarchy";
import { StateVisNode } from "./tree/stateVisNode"; // has or is using

export const RENDERER_PRESETS = {
  "Tree": { layoutFn: TREE_LAYOUT, sortNodesFn: TOP_TO_BOTTOM_SORT, labelRenderFn: SLANTED_TEXT, edgeRenderFn: TREE_EDGE },
  "Cluster": { layoutFn: CLUSTER_LAYOUT, sortNodesFn: TOP_TO_BOTTOM_SORT, labelRenderFn: SLANTED_TEXT, edgeRenderFn: TREE_EDGE },
  "Radial": { layoutFn: RADIAL_LAYOUT, sortNodesFn: BOTTOM_TO_TOP_SORT, labelRenderFn: RADIAL_TEXT, edgeRenderFn: RADIAL_EDGE },
};

const tree = RENDERER_PRESETS.Tree;

export const DEFAULT_RENDERER: Renderer = {
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

export function BOTTOM_TO_TOP_SORT (a: StateVisNode, b: StateVisNode) {
  let b2t = b.layoutY - a.layoutY; // bottom to top
  if (b2t !== 0) return b2t;
  let l2r = a.layoutX - b.layoutX; // left to right
  return l2r;
}

export function TOP_TO_BOTTOM_SORT (a: StateVisNode, b: StateVisNode) {
  let t2b = a.layoutY - b.layoutY; // top to bottom
  if (t2b !== 0) return t2b;
  let l2r = a.layoutX - b.layoutX; // left to right
  return l2r;
}







///////////////////////////////////////////
// LAYOUTS
///////////////////////////////////////////

export function TREE_LAYOUT(rootNode: StateVisNode) {
  let root = hierarchy(rootNode);
  let tree = d3tree<StateVisNode>();
  return updateNodes(tree(root));
}

export function CLUSTER_LAYOUT(rootNode: StateVisNode) {
  let root = hierarchy(rootNode);
  let tree = d3cluster<StateVisNode>();
  return updateNodes(tree(root));
}

/** For RADIAL_LAYOUT: projects x/y coords from a cluster layout to circular layout */
function project(x, y) {
  let angle = (x - 90) / 180 * Math.PI, radius = y;
  const CENTER = 0.5;
  return { x: CENTER + radius * Math.cos(angle), y: CENTER + radius * Math.sin(angle) };
}

export function RADIAL_LAYOUT(rootNode: StateVisNode) {
  let root = hierarchy(rootNode);

  let layout = d3cluster<StateVisNode>()
      .size([360, 0.4])
      .separation(function (a, b) {
        return (a.parent == b.parent ? 1 : 2) / a.depth;
      });

  let nodes = layout(root);

  nodes.each(function (node) {
    let projected = project(node.x, node.y);
    let visNode: StateVisNode = node.data;
    visNode.layoutX = node.x;
    visNode.layoutY = node.y;
    visNode.x = projected.x;
    visNode.y = projected.y;
  });
}

/** Mutates each StateVisNode by copying the new x/y values from the d3 HierarchyPointNode structure */
function updateNodes (nodes: HierarchyPointNode<StateVisNode>) {
  nodes.each(node => {
    node.data.layoutX = node.data.x = node.x;
    node.data.layoutY = node.data.y = node.y;
  });
  return nodes;
}











///////////////////////////////////////////
// STATE NAME LABEL
///////////////////////////////////////////

export function RADIAL_TEXT(x, y, node: StateVisNode, renderer: Renderer) {
  let { baseFontSize, zoom } = renderer;
  let fontSize = baseFontSize * zoom;

  let segments = node.name.split(".");
  let name = segments.pop();
  if (name == '**') name = segments.pop() + ".**";

  let angle = node.layoutX || 0;

  let textAnchor: string = (angle < 180 === !!node.children) ? "start" : "end";
  let rotation = (angle < 180 ? angle - 90 : angle + 90);
  let translation = (textAnchor === "start" ? 15 : -15) * zoom;

  let transform = `rotate(${rotation}),translate(${translation}, 0)`;

  return (
      <text
          className="name"
          text-anchor={textAnchor}
          transform={transform}
          font-size={fontSize}
      > {name} </text>
  )
}


export function SLANTED_TEXT(x, y, node: StateVisNode, renderer: Renderer) {
  let { baseRadius, baseFontSize, baseStrokeWidth, baseNodeStrokeWidth, zoom } = renderer;
  let r = baseRadius * zoom;
  let fontSize = baseFontSize * zoom;
  let segments = node.name.split(".");
  let name = segments.pop();
  if (name == '**') name = segments.pop() + ".**";

  let transform = `rotate(-15),translate(0, ${-15 * zoom})`;

  return (
      <text
          className="name"
          text-anchor="middle"
          transform={transform}
          font-size={fontSize}
      > {name} </text>
  )
}






///////////////////////////////////////////
// GRAPH EDGES
///////////////////////////////////////////

/** Straight line */
export function RADIAL_EDGE(node: StateVisNode, renderer: Renderer) {
  let strokeWidth = renderer.baseStrokeWidth * renderer.zoom;

  const makeLinkPath = (node: StateVisNode) => {
    let s = { x: node.animX, y: node.animY }; // statevisnode
    let p = { x: node._parent.animX, y: node._parent.animY }; // parent

    return "M" + [s.x, s.y]
        // + "C"  + [s.x, (s.y + p.y) / 2.5]
        // + " "  + [p.x, (s.y + p.y) / 2.5]
        + " "  + [p.x, p.y];
  };

  return <path d={makeLinkPath(node)} stroke-width={strokeWidth} className='link'/>
}

/** Bezier curve */
export function TREE_EDGE(node: StateVisNode, renderer: Renderer) {
  let strokeWidth = renderer.baseStrokeWidth * renderer.zoom;

  const makeLinkPath = (node: StateVisNode) => {
    let s = { x: node.animX, y: node.animY }; // statevisnode
    let p = { x: node._parent.animX, y: node._parent.animY }; // parent
    let yAvg = (s.y + p.y) / 2;
    return `M ${s.x} ${s.y} C ${s.x} ${yAvg}, ${p.x} ${yAvg}, ${p.x} ${p.y}`;
  };

  return <path d={makeLinkPath(node)} stroke-width={strokeWidth} className='link'/>
}