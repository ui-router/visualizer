import {h, render, Component} from "preact";
import {hierarchy, tree as d3tree} from "d3-hierarchy";
import {StateNode} from "./stateNode";
import {NodeDimensions, VisDimensions, StateVisNode} from "./interface";
import {animatePath} from "../util/animatepath";
import {easing} from "../util/easing";


export interface IProps extends NodeDimensions, VisDimensions {
  router;
}

export interface IState {
  nodes?: StateVisNode[];
  layout?: { [key: string]: { x: number, y: number } }
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

    let initialProps = Object.assign({}, props, { router });
    const _render = render(h(StateTree, initialProps), element);
    document.addEventListener('DOMContentLoaded', _render as any, false);

    return element;
  }

  state = {
    nodes: [],
    layout: {} as any
  };

  nodes: StateVisNode[] = [];
  tree: any;
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
    this.doLayoutAnimation()
  }

  dimensions() {
    var newProps = {} as any;

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

  makeLinkPath = (node) => {
    let s = this.getCurrentCoords(node);        // state
    let p = this.getCurrentCoords(node.parent); // parent
    let yAvg = (s.y + p.y) / 2;
    return `M ${s.x} ${s.y} C ${s.x} ${yAvg}, ${p.x} ${yAvg}, ${p.x} ${p.y}`;
  };
  // Gets the current coordinates for a node from the `layout` object

  getCurrentCoords = (node) =>
      this.state.layout[node.name] || { x: this.props.width / 2, y: this.props.height / 2 };

  cancelCurrentAnimation = () => null;

  doLayoutAnimation = () => {
    this.cancelCurrentAnimation();

    let nodes = this.nodes;
    if (!nodes.length) return;

    let tree = d3tree();
    let rootNode = nodes.filter(state => state.name === "")[0];
    let root = hierarchy(rootNode);
    this.tree = tree(root);
    this.tree.each(node => {
      node.data.x = node.x;
      node.data.y = node.y
    });

    let dimensions = this.dimensions();

    // Transforms x coord from the tree layout to fit the viewport using scale/offset values
    const transformX = (xval) => xval * dimensions.scaleX + dimensions.offsetX;
    // Transforms y coord from the tree layout to fit the viewport using scale/offset values
    const transformY = (yval) => yval * dimensions.scaleY + dimensions.offsetY;

    // An array containing current x/y coords for all nodes
    // [ x1, y1, x2, y2, x3, y3, x4, y4 ]
    let currentCoords = nodes.map(this.getCurrentCoords).map(obj => [obj.x, obj.y])
        .reduce((acc, arr) => acc.concat(arr), []);

    // An array containing target x/y coords for all nodes
    // [ x1', y1', x2', y2', x3', y3', x4', y4' ]
    let targetCoords = nodes.map(node => [transformX(node.x), transformY(node.y)])
        .reduce((acc, arr) => acc.concat(arr), []);

    // xyValArray is an array containing x/y coords for all nodes,
    // interpolated between currentCoords and targetCoords based on time
    // [ x1'', y1'', x2'', y2'', x3'', y3'', x4'', y4'' ]
    const animationFrame = (xyValArray) => {
      let layout = {} as any;
      let tupleCount = xyValArray.length / 2;
      for (let i = 0; i < tupleCount && i < nodes.length; i++) {
        let node = nodes[i];

        if (node.parent) {
          node._linkPath = this.makeLinkPath(node);
        }

        let x = xyValArray[(i * 2)];
        let y = xyValArray[(i * 2) + 1];
        layout[node.name] = { x, y };
      }

      this.setState({ layout });
    };

    this.cancelCurrentAnimation = animatePath(targetCoords, currentCoords, 1500, animationFrame, () => null, easing.easeInOutExpo);
  };

  nodeForState = (nodes, state) =>
      nodes.filter(node => node.name === state.name)[0];

  updateStates = () => {
    let router = this.props.router;

    let states = router.stateService.get().map(s => s.$$state());
    let known = this.nodes.map(Object.getPrototypeOf);
    let toAdd = states.filter(s => known.indexOf(s) === -1);
    let toDel = known.filter(s => states.indexOf(s) === -1);

    if (toAdd.length || toDel.length) {
      let nodes = this.nodes = this.nodes.slice();

      toAdd.map(s => Object.create(s)).forEach(n => nodes.push(n));
      toDel.map(del => nodes.filter(node => del.isPrototypeOf(node)))
          .reduce((acc, x) => acc.concat(x), [])
          .forEach(node => nodes.splice(nodes.indexOf(node), 1));

      // Rebuild each node's children array
      nodes.forEach((n: any) => n.children = []);
      nodes.forEach((n: any) => {
        if (!n || !n.parent) return;
        let parentNode: any = this.nodeForState(nodes, n.parent);
        if (!parentNode) return;
        parentNode.children.push(n);
        n._parent = parentNode;
      });
      nodes.forEach(n => n.future = !!n.lazyLoad);

      this.setState({ nodes: this.nodes }, this.doLayoutAnimation);
    }

    if (!this.unmounted && !this.deregisterStateListenerFn) {
      // poll if ui-router version is 1.0.0-beta.1 or earlier
      setTimeout(this.updateStates, 1000)
    }
  };

  updateNodes = ($transition$?) => {
    let nodes = this.nodes.map(node => Object.assign(node, resetMetadata));
    nodes.forEach(n => n.future = !!n.lazyLoad);

    if ($transition$) {
      let tc = $transition$.treeChanges();
      const getNode = node =>
          this.nodeForState(this.nodes, node.state);

      tc.retained.concat(tc.entering).map(getNode).forEach((n: StateVisNode) => n.entered = true);
      tc.retained.map(getNode).forEach((n: StateVisNode) => n.retained = true);
      tc.exiting.map(getNode).forEach((n: StateVisNode)=> n.exited = true);
      tc.to.slice(-1).map(getNode).forEach((n: StateVisNode)=> { n.active = true; n.label = "active"});
    }

    const applyClasses = (node) => {
      let classes = ["entered", "retained", "exited", "active", "inactive", "future", "highlight"];
      node._classes = classes.reduce((str, clazz) => (str + (node[clazz] ? ` ${clazz} ` : '')), '');
    };
    nodes.forEach(applyClasses);

    this.setState({ nodes: this.nodes });
  };

  render() {
    const layout = (node) =>
        this.state.layout[node.name] ||
        { x: this.props.width / 2, y: this.props.height / 2 };
    let radius = this.props.radius || this.dimensions().radius;

    return (
        <div className="statevis">
          <svg width={this.props.width} height={this.props.height}>

            { this.state.nodes.filter(node => node._linkPath).map(node =>
                <path d={node._linkPath} className='link'/>
            )}

            { this.state.nodes.map((node: StateVisNode) =>
                <StateNode
                    key={node.name}
                    node={node}
                    router={this.props.router}
                    radius={radius}
                    x={layout(node).x}
                    y={layout(node).y} />
            )}

          </svg>
        </div>
    )
  }
}

