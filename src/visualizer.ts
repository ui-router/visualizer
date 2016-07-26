import {StateSelector} from "./selector/stateSelector";
import {StateVisualizer} from "./state/stateVisualizer";
import {StateTree} from "./state/stateTree";
import {TransitionVisualizer} from "./transition/transitionVisualizer";
import * as React from "react";
import * as ReactDOM from "react-dom";

const visualizer = (router) => {
  let stateVisualizerEl = StateVisualizer.create(router);
  let transitionVisualizer = TransitionVisualizer.create(router);
  return { stateVisualizerEl, transitionVisualizer };
};

export {
    visualizer,           // visualizer(router);

    StateVisualizer,      // StateVisualizer.create(router, el?, props?)
    StateTree,            // StateTree.create(router, el?, props?)
    TransitionVisualizer, // TransitionVisualizer.create(router, el?, props?)

    StateSelector,        // React State Selector component
    React,
    ReactDOM,
};
