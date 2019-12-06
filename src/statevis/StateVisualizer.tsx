import { UIRouter } from '@uirouter/core';
import { h, render, Component } from 'preact';
import { draggable, dragActions } from '../util/draggable';
import { StateVisualizerOptions } from '../visualizer';
import { StateTree } from './tree/StateTree';
import { Controls } from './Controls';
import { StateVisWindow } from './StateVisWindow';
import { DEFAULT_RENDERER } from './renderers';
import { Renderer } from './interface';

declare function require(string): string;
require('./statevis.css');

export interface IProps {
  router;
  visualizationOptions: StateVisualizerOptions;
  minimizeAfter?: number; // ms
  width?: number; // px
  height?: number; // px
}

export interface IState {
  height?: number;
  width?: number;
  renderer?: Renderer;
  minimized: boolean;
}

export class StateVisualizer extends Component<IProps, IState> {
  state = { height: null, width: null, renderer: DEFAULT_RENDERER, minimized: false };

  private minimizeTimeout: any;
  private deregisterFns: Function[] = [];
  private window: StateVisWindow;

  /**
   * Creates a new StateVisualizer and adds it to the document.
   *
   * @param router the UIRouter object
   * @param element (optional) the element where the StateVisualizer should be placed.
   *                If no element is passed, an element will be created in the body.
   * @param props height/width properties default: { height: 350, width: 250 }
   * @param options StateVisualizerOptions used to customise the styling of the visualizer
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
  static create(router: UIRouter, element?: HTMLElement, props = {}, options?: StateVisualizerOptions) {
    if (!element) {
      element = document.createElement('div');
      element.id = 'uirStateVisualizer';
    }

    let initialProps: IProps = Object.assign({}, props, { router, minimizeAfter: 2500, visualizationOptions: options });
    const _render = () => {
      document.body.appendChild(element);
      render(h(StateVisualizer, initialProps), element);
    };

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      _render();
    } else {
      document.addEventListener('DOMContentLoaded', _render as any, false);
    }

    return element;
  }

  el: HTMLElement;
  windowEl: HTMLElement;

  dispose() {
    let Nothing = () => null;
    render(h(Nothing as any, null), document.body, this.el);
  }

  handleRendererChange(renderer: Renderer) {
    this.setState({ renderer });
  }

  cancelAutoMinimize() {
    if (this.minimizeTimeout) {
      clearTimeout(this.minimizeTimeout);
      this.minimizeTimeout = null;
    }
  }

  componentWillUnmount() {
    this.deregisterFns.forEach(fn => fn());
  }

  draggable() {
    let controlsEl = this.windowEl.querySelector('.uirStateVisControls');
    let visEl = this.windowEl.querySelector('.statevis');
    this.deregisterFns.push(draggable(controlsEl, dragActions.move(this.windowEl)));
    this.deregisterFns.push(draggable(visEl, dragActions.move(this.windowEl)));
  }

  componentDidMount() {
    this.draggable();

    if (this.props.minimizeAfter) {
      const doMinimize = () => this.setState({ minimized: true });
      this.minimizeTimeout = setTimeout(doMinimize, this.props.minimizeAfter);
    }
  }

  svgWidth = () => this.props.width || this.state.width || 350;
  svgHeight = () => (this.props.height || this.state.height || 250) - 25;

  render() {
    const { minimized } = this.state;
    return (
      <div
        ref={el => (this.el = el as HTMLElement)}
        onMouseDown={this.cancelAutoMinimize.bind(this)}
        onMouseEnter={this.cancelAutoMinimize.bind(this)}
      >
        <StateVisWindow
          minimized={this.state.minimized}
          ref={windowRef => (this.windowEl = (windowRef && windowRef.el) || this.windowEl)}
          onResize={({ width, height }) => this.setState({ width, height })}
        >
          <div
            onClick={() => this.setState({ minimized: false })}
            className={`uirStateVisWindowOverlay ${minimized ? 'minimized' : ''}`}
          />

          <Controls
            router={this.props.router}
            onRendererChange={this.handleRendererChange.bind(this)}
            onMinimize={() => this.setState({ minimized: true })}
            onClose={() => this.dispose()}
          />

          <StateTree
            router={this.props.router}
            nodeOptions={this.props.visualizationOptions.nodeOptions}
            width={this.svgWidth()}
            height={this.svgHeight()}
            renderer={this.state.renderer}
          />
        </StateVisWindow>
      </div>
    );
  }
}
