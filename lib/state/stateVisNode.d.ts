import { StateObject } from '@uirouter/core';
export interface StateVisNode {
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
export declare function createStateVisNode(state: StateObject): StateVisNode;
