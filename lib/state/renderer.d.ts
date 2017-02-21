import { Renderer } from "./interface";
import { HierarchyPointNode } from "d3-hierarchy";
import { StateVisNode } from "./stateVisNode";
export declare const RENDERER_PRESETS: {
    "Tree": {
        layoutFn: (rootNode: StateVisNode) => HierarchyPointNode<StateVisNode>;
        sortNodesFn: (a: StateVisNode, b: StateVisNode) => number;
        labelRenderFn: (x: any, y: any, node: StateVisNode, renderer: Renderer) => JSX.Element;
        edgeRenderFn: (node: StateVisNode, renderer: Renderer) => JSX.Element;
    };
    "Cluster": {
        layoutFn: (rootNode: StateVisNode) => HierarchyPointNode<StateVisNode>;
        sortNodesFn: (a: StateVisNode, b: StateVisNode) => number;
        labelRenderFn: (x: any, y: any, node: StateVisNode, renderer: Renderer) => JSX.Element;
        edgeRenderFn: (node: StateVisNode, renderer: Renderer) => JSX.Element;
    };
    "Radial": {
        layoutFn: (rootNode: StateVisNode) => void;
        sortNodesFn: (a: StateVisNode, b: StateVisNode) => number;
        labelRenderFn: (x: any, y: any, node: StateVisNode, renderer: Renderer) => JSX.Element;
        edgeRenderFn: (node: StateVisNode, renderer: Renderer) => JSX.Element;
    };
};
export declare const DEFAULT_RENDERER: Renderer;
export declare function BOTTOM_TO_TOP_SORT(a: StateVisNode, b: StateVisNode): number;
export declare function TOP_TO_BOTTOM_SORT(a: StateVisNode, b: StateVisNode): number;
export declare function TREE_LAYOUT(rootNode: StateVisNode): HierarchyPointNode<StateVisNode>;
export declare function CLUSTER_LAYOUT(rootNode: StateVisNode): HierarchyPointNode<StateVisNode>;
export declare function RADIAL_LAYOUT(rootNode: StateVisNode): void;
export declare function RADIAL_TEXT(x: any, y: any, node: StateVisNode, renderer: Renderer): JSX.Element;
export declare function SLANTED_TEXT(x: any, y: any, node: StateVisNode, renderer: Renderer): JSX.Element;
/** Straight line */
export declare function RADIAL_EDGE(node: StateVisNode, renderer: Renderer): JSX.Element;
/** Bezier curve */
export declare function TREE_EDGE(node: StateVisNode, renderer: Renderer): JSX.Element;
