import * as React from "react";
import * as ReactDOM from "react-dom";

import "./stateVisualizer.css";

import {StateSelector} from "../selector/stateSelector";
import {toggleClass, addClass} from "../util/toggleClass";
import {draggable} from "../util/draggable";
import {StateTree} from "./stateTree";

export interface IProps {
  router;
  width?: number;
  height?: number;
}
export interface IState { }
export class StateVisualizer extends React.Component<IProps, IState> {
  /**
   * Creates a new StateVisualizer and adds it to the document.
   *
   * @param router the UIRouter object
   * @param element (optional) the element where the StateVisualizer should be placed.
   *                If no element is passed, an element will be created in the body.
   *
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
  static create(router, element?) {
    if (!element) {
      element = document.createElement("div");
      element.id = "uirStateVisualizer";
      document.body.appendChild(element);
    }

    const render = ReactDOM.render(React.createElement(StateVisualizer, { router }), element);
    document.addEventListener('DOMContentLoaded', render as any, false);

    return element;
  }

  private el;
  right: string;
  bottom: string;

  minimize = (evt?) => {
    evt && evt.preventDefault();
    evt && evt.stopPropagation();

    let el = this.el;
    let bounds = el.getBoundingClientRect();

    this.right = (window.innerWidth - bounds.right) + "px";
    this.bottom = (window.innerHeight - bounds.bottom) + "px";

    el.style.top = "auto";
    el.style.left = "auto";
    el.style.right = this.right;
    el.style.bottom = this.bottom;

    let unminimize = () => {
      el.style.top = "auto";
      el.style.left = "auto";
      el.style.right = this.right;
      el.style.bottom = this.bottom;

      toggleClass('minimized')(el);
      el.removeEventListener("click", unminimize);
    };

    addClass('minimized')(el);
    el.addEventListener("click", unminimize);
    // wait 50ms to avoid coordinates jumping directly to 0/0 and avoid animation
    setTimeout(() => el.style.right = el.style.bottom = "0", 50);
  };

  componentDidMount() {
    draggable(this.el);
  }

  render() {
    return (
        <div ref={(el) => this.el = el} className="uirStateVisContainer">
          <div className="uirStateVisControls">
            <div> Current State: <StateSelector router={this.props.router} /></div>
            <button onClick={this.minimize}>
              <i className="fa fa-chevron-down" style={{ cursor: 'pointer' }} />
            </button>
          </div>

          <StateTree
              router={this.props.router}
              width={this.props.width || 350}
              height={this.props.height || 250}
          />
        </div>
    )
  }
}
