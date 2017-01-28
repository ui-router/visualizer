import { h, render, Component } from "preact";
import { State } from "ui-router-core";
import { StateNode } from "./stateNode";
import { NodeDimensions, VisDimensions, Renderer } from "./interface";
import { animatePath } from "../util/animatepath";
import { easing } from "../util/easing";
import { DEFAULT_RENDERER } from "./renderer";
import { createStateVisNode, StateVisNode } from "./stateVisNode";

export interface IProps extends NodeDimensions, VisDimensions {
  router?;
  renderer?: Renderer;
}

export interface IState {
  nodes?: StateVisNode[];
}

let resetMetadata = {
  label: '',
  highlight: false,
  active: false,
  future: false,
  retained: false,
  entered: false,
  exited: false,
  inactive: true
};

export class StateTree extends Component<IProps, IState> {
  static create(router, element?, props = {}) {
    if (!element) {
      element = document.createElement("div");
      element.id = "uirStateTree";
      document.body.appendChild(element);
    }

    let initialProps = Object.assign({} as IProps, props, { router, sizes: DEFAULT_RENDERER });
    const _render = render(h(StateTree, initialProps), element);
    document.addEventListener('DOMContentLoaded', _render as any, false);

    return element;
  }

  state = {
    nodes: [],
    layout: {} as any
  };

  nodes: StateVisNode[] = [];
  unmounted: boolean = false;
  deregisterHookFn: Function;
  deregisterStateListenerFn: Function;

  componentDidMount() {
    let registry = this.props.router.stateRegistry;
    let $transitions = this.props.router.transitionService;

    // Register states changed listener
    if (registry.onStatesChanged) {
      this.deregisterStateListenerFn = registry.onStatesChanged(() => this.updateStates());
    }
    this.updateStates();

    // Register onSuccess transition hook to toggle the SVG classes
    this.deregisterHookFn = $transitions.onSuccess({}, (trans) => this.updateNodes(trans));
    this.updateNodes();
  }

  componentWillReceiveProps() {
    let nodes = this.state.nodes;
    this.setState({ nodes }, this.updateStates);
  }

  dimensions() {
    let newProps = {} as any;

    let radius = 15;
    let offsetX = 0;
    let offsetY = radius * 2;
    let height = this.props.height || 500;
    let width = this.props.width || 500;

    let scaleX = newProps.scaleX || (width - offsetX * 2);
    let scaleY = newProps.scaleY || (height - offsetY * 2);

    return { radius, offsetX, offsetY, scaleX, scaleY };
  }

  componentWillUnmount() {
    this.unmounted = true;
    this.deregisterHookFn && this.deregisterHookFn();
  }

  cancelCurrentAnimation = () => null;

  doLayoutAnimation = () => {
    this.cancelCurrentAnimation();

    let nodes = this.getNodes();
    if (!nodes.length) return;

    let rootNode = nodes.filter(state => state.name === "")[0];
    this.props.renderer.layoutFn(rootNode);

    let dimensions = this.dimensions();

    // Transforms x coord from the tree layout to fit the viewport using scale/offset values
    const transformX = (xval) => xval * dimensions.scaleX + dimensions.offsetX;
    // Transforms y coord from the tree layout to fit the viewport using scale/offset values
    const transformY = (yval) => yval * dimensions.scaleY + dimensions.offsetY;

    const getCurrentCoords = (node) =>
        ({ x: node.animX || this.props.width / 2, y: node.animY || this.props.height / 2 });

    // An array containing current x/y coords for all nodes
    // [ x1, y1, x2, y2, x3, y3, x4, y4 ]
    let currentCoords = nodes.map(getCurrentCoords).map(obj => [obj.x, obj.y])
        .reduce((acc, arr) => acc.concat(arr), []);

    // An array containing target x/y coords for all nodes
    // [ x1', y1', x2', y2', x3', y3', x4', y4' ]
    let targetCoords = nodes.map(node => [transformX(node.x), transformY(node.y)])
        .reduce((acc, arr) => acc.concat(arr), []);

    // xyValArray is an array containing x/y coords for all nodes,
    // interpolated between currentCoords and targetCoords based on time
    // [ x1'', y1'', x2'', y2'', x3'', y3'', x4'', y4'' ]
    const animationFrame = (xyValArray) => {
      let tupleCount = xyValArray.length / 2;
      for (let i = 0; i < tupleCount && i < nodes.length; i++) {
        let node = nodes[i];
        node.animX = xyValArray[(i * 2)];
        node.animY = xyValArray[(i * 2) + 1];
      }

      this.setState({ nodes });
    };

    this.cancelCurrentAnimation = animatePath(targetCoords, currentCoords, 500, animationFrame, () => null, easing.easeInOutExpo);
  };

  nodeForState = (nodes, state) =>
      nodes.filter(node => node.name === state.name)[0];

  updateStates = () => {
    let router = this.props.router;

    let states = router.stateService.get().map(s => s.$$state());
    let known = this.nodes.map(Object.getPrototypeOf);
    let toAdd = states.filter(s => known.indexOf(s) === -1);
    let toDel = known.filter(s => states.indexOf(s) === -1);

    let nodes = this.nodes = this.nodes.slice();

    if (toAdd.length || toDel.length) {
      toAdd.map(s => createStateVisNode(s)).forEach(n => nodes.push(n));
      toDel.map(del => nodes.filter(node => del.isPrototypeOf(node)))
          .reduce((acc, x) => acc.concat(x), [])
          .forEach(node => nodes.splice(nodes.indexOf(node), 1));

      // Rebuild each node's children array
      nodes.forEach(n => n._children = []);
      nodes.forEach(n => {
        if (!n || !n.parent) return;
        let parentNode: any = this.nodeForState(nodes, n.parent);
        if (!parentNode) return;
        parentNode._children.push(n);
        n._parent = parentNode;
      });
      nodes.forEach(n => n.future = !!n.lazyLoad);
    }

    if (!this.unmounted && !this.deregisterStateListenerFn) {
      // poll if ui-router version is 1.0.0-beta.1 or earlier
      setTimeout(this.updateStates, 1000)
    }

    this.setState({ nodes }, this.doLayoutAnimation);
  };

  updateNodes = ($transition$?) => {
    let nodes = this.nodes.map(node => Object.assign(node, resetMetadata));
    nodes.forEach(n => n.future = !!n.lazyLoad);

    if ($transition$) {
      let tc = $transition$.treeChanges();
      const getNode = node =>
          this.nodeForState(this.nodes, node.state);

      tc.retained.concat(tc.entering).map(getNode).filter(x=>x).forEach((n: StateVisNode) => n.entered = true);
      tc.retained.map(getNode).filter(x=>x).forEach((n: StateVisNode) => n.retained = true);
      tc.exiting.map(getNode).filter(x=>x).forEach((n: StateVisNode)=> n.exited = true);
      tc.to.slice(-1).map(getNode).filter(x=>x).forEach((n: StateVisNode)=> { n.active = true; n.label = "active"});
    }

    this.setState({ nodes: this.nodes }, this.doLayoutAnimation);
  };

  getNodes() {
    return this.nodes.slice().sort(this.props.renderer.sortNodesFn)
  }

  render() {
    let renderer = this.props.renderer;
    let renderNodes = this.getNodes()
        .filter(node => node.visible && node.animX && node.animY);

    return (
        <div className="statevis">
          <svg width={this.props.width} height={this.props.height}>

            { renderNodes.filter(node => !!node.parent).map(node =>
              renderer.edgeRenderFn(node, renderer)
            ) }

            { renderNodes.map((node: StateVisNode) =>
                <StateNode
                    key={node.name}
                    node={node}
                    router={this.props.router}
                    renderer={this.props.renderer}
                    doLayout={this.doLayoutAnimation.bind(this)}
                    x={node.animX}
                    y={node.animY} />
            )}

          </svg>
        </div>
    )
  }
}

