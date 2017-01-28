import { h, render, Component } from "preact";
import "./stateVisualizer.css";
import { StateSelector } from "../selector/stateSelector";
import { toggleClass, addClass } from "../util/toggleClass";
import { draggable, dragActions } from "../util/draggable";
import { StateTree } from "./stateTree";
import { DEFAULT_RENDERER, RENDERER_PRESETS } from "./renderer";
import { Renderer } from "./interface";

declare function require(string): string;
let imgChevron = require('../../images/16/chevron-down.png');

export interface IProps {
  router;
  minimizeAfter?: number; // ms
  width?: number; // px
  height?: number; // px
}

export interface IState {
  height?: number,
  width?: number,
  renderer?: Renderer,
  presetName?: string,
}

export class StateVisualizer extends Component<IProps, IState> {
  state = { height: null, width: null, presetName: 'Tree', renderer: DEFAULT_RENDERER };

  private minimizeTimeout: any;
  private deregisterFns: Function[] = [];
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
  static create(router, element?, props = {}) {
    if (!element) {
      element = document.createElement("div");
      element.id = "uirStateVisualizer";
      document.body.appendChild(element);
    }

    let initialProps: IProps = Object.assign({}, props, { router, minimizeAfter: 2500 });
    const _render = render(h(StateVisualizer, initialProps), element);
    document.addEventListener('DOMContentLoaded', _render as any, false);

    return element;
  }

  private el;
  top: string;
  left: string;
  right: string;
  bottom: string;

  minimize = (evt?) => {
    evt && evt.preventDefault();
    evt && evt.stopPropagation();

    let el = this.el;
    let bounds = el.getBoundingClientRect();

    this.top = (bounds.top) + "px";
    this.left = (bounds.left) + "px";
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
      const animationEndListener = (evt) => {
        let bounds = el.getBoundingClientRect();
        el.style.top = bounds.top + "px";
        el.style.left = bounds.left + "px";
        el.style.right = "auto";
        el.style.bottom = "auto";
        el.removeEventListener("transitionend", animationEndListener);
      };
      el.addEventListener("transitionend", animationEndListener);
    };

    addClass('minimized')(el);
    el.addEventListener("click", unminimize);
    // wait 50ms to avoid coordinates jumping directly to 0/0 and avoid animation
    setTimeout(() => el.style.right = el.style.bottom = "0", 50);
  };

  handleClick() {
    if (this.minimizeTimeout) {
      clearTimeout(this.minimizeTimeout);
      this.minimizeTimeout = null;
    }
  }

  componentWillUnmount() {
    this.deregisterFns.forEach(fn => fn());
  }

  componentDidMount() {
    let controlsEl = this.el.querySelector('.uirStateVisControls');
    let visEl = this.el.querySelector('.statevis');
    this.deregisterFns.push(draggable(controlsEl, dragActions.move(this.el)));
    this.deregisterFns.push(draggable(visEl, dragActions.move(this.el)));

    this.monitorResizeEvents();

    if (this.props.minimizeAfter) {
      this.minimizeTimeout = setTimeout(this.minimize.bind(this), this.props.minimizeAfter);
    }
  }

  monitorResizeEvents() {
    let _width = this.el.style.width;
    let _height = this.el.style.height;

    let observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName == 'style') {
          let el = mutation.target,
              newwidth = el['style'].width,
              newheight = el['style'].height;

          if (newwidth !== _width || newheight !== _height) {
            _width = newwidth;
            _height = newheight;
            let width = parseInt(newwidth.replace(/px$/, ""));
            let height = parseInt(newheight.replace(/px$/, ""));
            this.setState({ width, height })
          }
        }
      });
    });

    let config = {
      attributes: true,
      childList: false,
      characterData: false,
      subtree: false,
      attributeFilter: ['style']
    };

    observer.observe(this.el, config);
    this.deregisterFns.push(() => observer.disconnect());
  }

  handleZoom(event: Event) {
    let el = event.target;
    let value = parseFloat(el['value']);
    let renderer = { ...this.state.renderer, zoom: value };
    this.setState({ renderer });
  }

  handleLayout(event: Event) {
    let presetName = event.target['value'];
    let settings = RENDERER_PRESETS[presetName];
    let renderer = { ...this.state.renderer, ...settings };
    this.setState({ renderer, presetName });
  }

  svgWidth = () => this.props.width || this.state.width || 350;
  svgHeight = () => (this.props.height || this.state.height || 250) - 25;

  render() {
    const zoomLevels = [2.0, 1.5, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3];
    
    return (
        <div ref={(el) => this.el = el} className="uirStateVisContainer" onClick={ this.handleClick.bind(this) }>
          <div className="uirStateVisControls">
            <div> Current State: <StateSelector router={this.props.router}  /></div>

            <div>
              
              <select onChange={this.handleLayout.bind(this)} value={this.state.presetName} style={{ maxWidth: 100 }}>
                { Object.keys(RENDERER_PRESETS).map(preset =>
                    <option value={preset}>{preset}</option>
                )}
              </select>

              <select onChange={this.handleZoom.bind(this)} value={this.state.renderer.zoom + ''} style={{ maxWidth: 100 }}>
                { zoomLevels.map(level =>
                    <option value={level + ""}>{level}x</option>
                )}
              </select>

            </div>

            <button onClick={this.minimize}>
              <img src={imgChevron} style={{ cursor: 'pointer' }} />
            </button>
          </div>

          <StateTree
              router={this.props.router}
              width={this.svgWidth()}
              height={this.svgHeight()}
              renderer={this.state.renderer}
          />
        </div>
    )
  }
}
