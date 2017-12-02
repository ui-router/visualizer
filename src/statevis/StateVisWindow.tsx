import { h, render, Component } from "preact";
import { StateSelector } from "../selector/StateSelector";
import { toggleClass, addClass } from "../util/toggleClass";
import { draggable, dragActions } from "../util/draggable";
import { StateTree } from "./tree/StateTree";
import { Controls } from './Controls';
import { DEFAULT_RENDERER, RENDERER_PRESETS } from "./renderers";
import { Renderer } from "./interface";

export interface IProps {
  minimized?: boolean; // ms
  onResize?: (dimensions: { width: number, height: number }) => void;
}

export interface IState {
  unminimize: Function;
}

/** A floating window that supports minimization and resizing  */
export class StateVisWindow extends Component<IProps, IState> {
  private deregisterFns: Function[] = [];

  el: HTMLElement;
  top: string;
  left: string;
  right: string;
  bottom: string;

  constructor(props: IProps) {
    super(props);
    
    this.state = {
      unminimize: null,
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (this.props.minimized !== nextProps.minimized) {
      const { unminimize } = this.state;
      if (unminimize) {
        this.setState({ unminimize: null }, () => unminimize())
      } else {
        this.setState({ unminimize: this.minimize() });
      }
    }
  }

  minimize = () => {
    // evt && evt.preventDefault();
    // evt && evt.stopPropagation();

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

    // wait 50ms to avoid coordinates jumping directly to 0/0 and avoid animation
    setTimeout(() => el.style.right = el.style.bottom = "0", 50);
    return unminimize;
  };

  componentWillUnmount() {
    this.deregisterFns.forEach(fn => fn());
  }

  componentDidMount() {
    if (typeof MutationObserver === 'function') {
      this.monitorResizeEvents();
    } 
  }

  /** The uirStateVisContainer class enables resize: both. This function listens for resize events */
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
            this.props.onResize({ width, height })
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

  render() {
    return (
      <div className="uirStateVisContainer" ref={(el) => this.el = el as HTMLElement}>
        {this.props.children}
      </div>
    )
  }
}
