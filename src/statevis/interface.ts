import { NodeOptions } from './tree/StateTree';
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

export interface Renderer {
  // Determines the render order of nodes (to allow a sort of "z-ordering")
  sortNodesFn(a: StateVisNode, b: StateVisNode): number;
  // Applies a layout to the nodes
  layoutFn(rootNode: StateVisNode): void;
  // Renders a state label
  labelRenderFn(x: number, y: number, node: StateVisNode, nodeOptions: NodeOptions, renderer: Renderer): any;
  // Renders an edge
  edgeRenderFn(rootNode: StateVisNode, renderer: Renderer): any;

  baseRadius: number; // size of circles radius, in pixels
  baseFontSize: number; // size of text, in pixels
  baseStrokeWidth: number; // stroke width of lines
  baseNodeStrokeWidth: number; // stroke width of circles
  zoom: number; // 0.0-1.0
}
