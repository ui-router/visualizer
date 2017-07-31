import { UIRouter, UIRouterPlugin } from "@uirouter/core";
import { StateSelector } from "./selector/stateSelector";
import { StateVisualizer } from "./state/stateVisualizer";
import { StateTree } from "./state/stateTree";
import { TransitionVisualizer } from "./transition/transitionVisualizer";
declare const visualizer: (router: UIRouter) => Visualizer;
export interface Options {
    state?: boolean;
    transition?: boolean;
}
declare class Visualizer implements UIRouterPlugin {
    router: UIRouter;
    name: string;
    private stateVisualizerEl;
    private transitionVisualizerEl;
    dispose(router?: UIRouter): any;
    constructor(router: UIRouter, options: Options);
}
export { Visualizer, visualizer, StateVisualizer, StateTree, TransitionVisualizer, StateSelector };
