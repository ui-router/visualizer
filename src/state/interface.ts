export interface StateVisNode {
  name:       string;

  label:      string;
  highlight:  boolean;
  active:     boolean;
  retained:   boolean;
  exited:     boolean;
  entered:    boolean;
  inactive:   boolean;
  children:   StateVisNode[];
  parent:     StateVisNode;

  _classes: string;
  _linkPath: any;
  _x: number;
  _y: number;

  x: number;
  y: number;
}

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

