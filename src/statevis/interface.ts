import { StateVisNode } from './tree/stateVisNode';

export interface NodeDimensions {
  radius?: number;
  offsetX?: number;
  offsetY?: number;
  scaleX?: number;
  scaleY?: number;
}

export interface VisDimensions {
  height: number;
  width: number;
}

export interface LayoutFn {
  (rootNode: StateVisNode): void;
}

export interface NodeSortFn {
  (a: StateVisNode, b: StateVisNode): number;
}

export interface EdgeRenderFn {
  (rootNode: StateVisNode, renderer: Renderer): any;
}

export interface LabelRenderFn {
  (x: number, y: number, node: StateVisNode, renderer: Renderer): any;
}

export interface Renderer {
  sortNodesFn: NodeSortFn; // Determines the render order of nodes (to allow a sort of "z-ordering")
  layoutFn: LayoutFn; // Applies a layout to the nodes
  labelRenderFn: LabelRenderFn; // Renders a state label
  edgeRenderFn: EdgeRenderFn; // Renders an edge

  baseRadius: number; // size of circles radius, in pixels
  baseFontSize: number; // size of text, in pixels
  baseStrokeWidth: number; // stroke width of lines
  baseNodeStrokeWidth: number; // stroke width of circles
  zoom: number; // 0.0-1.0
}
