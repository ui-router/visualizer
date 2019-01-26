import { StateObject, UIRouter, UIRouterPlugin } from '@uirouter/core';
declare const visualizer: (router: UIRouter) => Visualizer;

export interface Options {
  state?: boolean;
  transition?: boolean;
}

// The plugin
declare class Visualizer implements UIRouterPlugin {
  router: UIRouter;
  name: string;
  private stateVisualizerEl;
  private transitionVisualizerEl;
  dispose(router?: UIRouter): any;
  constructor(router: UIRouter, options: Options);
}

// The StateSelector component
export interface IStateSelectorProps {
  router: any;
}
declare const StateSelector: (props: IStateSelectorProps) => any;

// The StateVisualizer component
interface StateVisualizerStatics {
  /**
   * Creates a new StateVisualizer and adds it to the document.
   *
   * @param router the UIRouter object
   * @param element (optional) the element where the StateVisualizer should be placed.
   *                If no element is passed, an element will be created in the body.
   * @param props height/width properties default: { height: 350, width: 250 }
   *
   * # Angular 1 + UI-Router (1.0.0-beta.2 and higher):
   *
   * Inject the router (`$uiRouter`) in a run block, then call StateVisualizer.create();
   *
   * ```
   * app.run(function($uiRouter) {
   *   StateVisualizer.create($uiRouter);
   * });
   * ```
   *
   * # Angular 1 + UI-Router 1.0.0-alpha.1 through 1.0.0-beta.1:
   *
   * Inject the router (`ng1UIRouter`) in a run block, then call StateVisualizer.create();
   *
   * ```
   * app.run(function(ng1UIRouter) {
   *   StateVisualizer.create(ng1UIRouter);
   * });
   * ```
   *
   * Angular 2:
   *
   * Call StateVisualizer.create() from your UIRouterConfig
   *
   * ```
   * export class MyUIRouterConfig extends UIRouterConfig {
   *   configure(router: UIRouter) {
   *     StateVisualizer.create(router);
   *   }
   * }
   * ```
   *
   * React:
   *
   * Call StateVisualizer.create() from your bootstrap
   *
   * ```
   * let router = new UIRouterReact();
   * StateVisualizer.create(router);
   * router.start();
   * ```
   *
   * @return the element that was bootstrapped.
   *         You can destroy the component using:
   *         [ReactDOM.unmountComponentAtNode](https://facebook.github.io/react/docs/top-level-api.html#reactdom.unmountcomponentatnode)
   */
  create(router: any, element?: any, props?: {}): any;
}

export interface IStateVisualizerProps {
  router: any;
  minimizeAfter?: number;
  width?: number;
  height?: number;
}
declare const StateVisualizer: ((props: IStateVisualizerProps) => any) & StateVisualizerStatics;

// The StateTree component
export interface IStateTreeProps extends NodeDimensions, VisDimensions {
  router?: any;
  renderer?: Renderer;
}
// The StateVisualizer component
declare const StateTree: (props: IStateTreeProps) => any;

// The TransitionVisualizer component

export interface ITransitionVisualizerProps {
  router: any;
  maximumTransitions?: number;
}
/**
 * This outer component manages the list of all transitions (history), and provides a fixed, scrolling viewport.
 * It attaches hooks for lifecycle events and decorates the transition with a descriptive message.
 */
declare const TransitionVisualizer: ((props: ITransitionVisualizerProps) => any) & TransitionVisualizerStatics;
interface TransitionVisualizerStatics {
  /**
   * Creates a new TransitionVisualizer and adds it to the document.
   *
   * @param router the UIRouter object
   * @param element (optional) the element where the TransitionVisualizer should be placed.
   *                If no element is passed, an element will be created in the body.
   * @param props maximum transitions default: { maximumTransitions: 15 }
   *
   *
   * # Angular 1 + UI-Router (1.0.0-beta.2 and higher):
   *
   * Inject the router (`$uiRouter`) in a run block, then call TransitionVisualizer.create();
   *
   * ```
   * app.run(function($uiRouter) {
   *   TransitionVisualizer.create($uiRouter);
   * });
   * ```
   *
   * # Angular 1 + UI-Router 1.0.0-alpha.1 through 1.0.0-beta.1:
   *
   * Inject the router (`ng1UIRouter`) in a run block, then call TransitionVisualizer.create();
   *
   * ```
   * app.run(function(ng1UIRouter) {
   *   TransitionVisualizer.create(ng1UIRouter);
   * });
   * ```
   *
   * Angular 2:
   *
   * Call TransitionVisualizer.create() from your UIRouterConfig
   *
   * ```
   * export class MyUIRouterConfig extends UIRouterConfig {
   *   configure(router: UIRouter) {
   *     TransitionVisualizer.create(router);
   *   }
   * }
   * ```
   *
   * React:
   *
   * Call TransitionVisualizer.create() from your bootstrap
   *
   * ```
   * let router = new UIRouterReact();
   * TransitionVisualizer.create(router);
   * router.start();
   * ```
   *
   * @return the element that was bootstrapped.
   *         You can destroy the component using:
   *         [ReactDOM.unmountComponentAtNode](https://facebook.github.io/react/docs/top-level-api.html#reactdom.unmountcomponentatnode)
   */
  create(router: any, element?: any, props?: {}): any;
}

// Other non-preact interface defs
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
  labelRenderFn(x: number, y: number, node: StateVisNode, renderer: Renderer): any;
  // Renders an edge
  edgeRenderFn(rootNode: StateVisNode, renderer: Renderer): any;

  baseRadius: number; // size of circles radius, in pixels
  baseFontSize: number; // size of text, in pixels
  baseStrokeWidth: number; // stroke width of lines
  baseNodeStrokeWidth: number; // stroke width of circles
  zoom: number; // 0.0-1.0
}

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

export { Visualizer, visualizer, StateSelector, StateVisualizer, StateTree, TransitionVisualizer };
