import { h, render, Component } from "preact";

import {TransitionView} from "./TransitionView";
import {easing} from "../util/easing";
import {animatePath} from "../util/animatepath";

declare var require;
require("./transitionVisualizer.css");

export interface IProps {
  router: any;
  maximumTransitions?: number;
}

export interface IState {
  transitions?: any[];
  pointerEvents?: string;
}

/**
 * This outer component manages the list of all transitions (history), and provides a fixed, scrolling viewport.
 * It attaches hooks for lifecycle events and decorates the transition with a descriptive message.
 */
export class TransitionVisualizer extends Component<IProps, IState> {
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
  static create(router, element?, props = {}) {
    if (!element) {
      element = document.createElement("div");
      element.id = "uirTransitionVisualizer";
    }

    let initialProps = Object.assign({}, props, { router });
    const _render = () => {
      document.body.appendChild(element);
      render(h(TransitionVisualizer, initialProps), element);
    };

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      _render();
    } else {
      document.addEventListener('DOMContentLoaded', _render as any, false);
    }

    return element;
  }

  deregisterFns = [];

  state = {
    transitions: [],
    pointerEvents: "auto",
  };

  static defaultProps = {
    router: null,
    maximumTransitions: 15
  };

  _div;
  cancelPreviousAnim = null;

  componentDidMount() {
    let dereg = this.props.router.transitionService.onBefore({}, (trans) => {
      this.setState({ transitions: this.state.transitions.concat(trans) });

      let duration = 750, el = this._div.children[0];

      let scrollToRight = () => {
        let targetScrollX = el.scrollWidth - el.clientWidth + 200;
        this.cancelPreviousAnim && this.cancelPreviousAnim();
        let newVal = [targetScrollX], oldVal = [el.scrollLeft];
        let max = this.props.maximumTransitions;

        let enforceMax = () => {
          let list = this.state.transitions;
          if (list.length <= max) return;
          this.setState({ transitions: list.slice(list.length - max)});
        };

        let callback = (vals) => el.scrollLeft = vals[0];
        this.cancelPreviousAnim = animatePath(newVal, oldVal, duration, callback, enforceMax, easing.easeInOutCubic);
      };

      setTimeout(scrollToRight, 25);
    });
    this.deregisterFns.push(dereg);

    document.body.addEventListener("mousemove", this.onMouseMove);
    this.deregisterFns.push(() => document.body.removeEventListener("mousemove", this.onMouseMove));
  }

  /** 
   * Disable pointer events when the mouse is above the timeline
   * 
   * This allows clicks to pass through the outer div to the user's app components
   * even when a transitionview details box is open and pinned.
   * 
   * Enable pointer events when mouse is inside the timeline to allow horizontal scroll & scroll wheel
   */
  onMouseMove = (evt) => {
    let windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var pointerEvents = (windowHeight - evt.clientY < 65 ? "auto" : "none");
    if (this.state.pointerEvents != pointerEvents) {
      this.setState({pointerEvents});
    }
  };

  componentWillUnmount() {
    while (this.deregisterFns.length) this.deregisterFns.pop()();
  }

  render() {
    let pointerEvents = this.state.pointerEvents;

    return (
      <div ref={el => this._div = el}>
        <div className="uirTranVis_history" style={{ pointerEvents }}>
          { this.state.transitions.map(trans =>
            <div key={trans.$id} className="uirTranVis_transition">
              <TransitionView transition={trans} />
              <div style={{minWidth: "18em", border: "1px solid transparent"}}></div>
            </div>
          )}
          <div style={{ width: "200px", height: "1px" }} />
        </div>
      </div>
    )
  }
}
