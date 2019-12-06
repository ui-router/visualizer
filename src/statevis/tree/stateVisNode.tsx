import { StateObject } from '@uirouter/core';

export interface StateVisNode extends StateObject {
  name: string;

  label: string;
  highlight: boolean;
  active: boolean;
  retained: boolean;
  exited: boolean;
  entered: boolean;
  inactive: boolean;
  _collapsed: boolean;
  readonly collapsed: boolean;
  readonly visible: boolean;
  parent: StateObject;
  _parent: StateVisNode;
  _children: StateVisNode[];
  readonly children: StateVisNode[];
  future: boolean;
  lazyLoad: any;
  readonly totalDescendents: number;

  _classes: string;

  /** Original x coordinate from d3 layout: tree() or cluster() */
  layoutX: number;
  /** Original y coordinate from d3 layout: tree() or cluster() */
  layoutY: number;

  /** Projected x coordinate (i.e., for radial projection) */
  x: number;
  /** Projected y coordinate (i.e., for radial projection) */
  y: number;

  /** Current animation frame's x coordinate */
  animX: number;
  /** Current animation frame's y coordinate */
  animY: number;
}

export function createStateVisNode(state: StateObject): StateVisNode {
  let node: StateVisNode = Object.create(state);

  Object.defineProperty(node, 'visible', {
    get() {
      if (this.entered) return true;
      let ancestorCollapsed = this._parent && (this._parent.collapsed || !this._parent.visible);
      return !ancestorCollapsed;
    },
  });

  Object.defineProperty(node, 'children', {
    get() {
      return this._children.filter(child => child.visible);
    },
  });

  Object.defineProperty(node, 'totalDescendents', {
    get() {
      return this._children.reduce((acc, child) => acc + child.totalDescendents, this._children.length);
    },
  });

  Object.defineProperty(node, 'collapsed', {
    get() {
      return !this.entered && this._collapsed && this._children.length;
    },
  });

  return node;
}
