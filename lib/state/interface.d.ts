import { StateVisNode } from './stateVisNode';
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
    sortNodesFn: NodeSortFn;
    layoutFn: LayoutFn;
    labelRenderFn: LabelRenderFn;
    edgeRenderFn: EdgeRenderFn;
    baseRadius: number;
    baseFontSize: number;
    baseStrokeWidth: number;
    baseNodeStrokeWidth: number;
    zoom: number;
}
