import {StateSelector} from "./selector/stateSelector";
import {StateVisualizer} from "./state/stateVisualizer";
import {TransitionVisualizer} from "./transition/transitionVisualizer";

const visualizer = (router) => {
  let stateVisualizerEl = StateVisualizer.create(router);
  let transitionVisualizer = TransitionVisualizer.create(router);
  return { stateVisualizerEl, transitionVisualizer };
};

export { visualizer, StateSelector, StateVisualizer, TransitionVisualizer };
