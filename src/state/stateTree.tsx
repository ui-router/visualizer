import * as d3 from "d3";
import * as React from "react";
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
  retained: false,
  entered: false,
  exited: false,
  inactive: true
};

export class StateTree extends React.Component<IProps, IState> {
  state = {
    nodes: [],
    layout: {} as any
  };

  tree: any;
  unmounted: boolean = false;
  deregisterFn: Function;

  componentDidMount() {
    // Register onSuccess transition hook to toggle the active state SVG classes
    this.deregisterFn = this.props.router.transitionService.onSuccess({}, ($transition$) => {
      let tc = $transition$.treeChanges();
      const getNode = node => this.nodeForState(this.state.nodes, node.state);

      let nodes = this.state.nodes.map(node => Object.assign(node, resetMetadata));

      tc.retained.concat(tc.entering).map(getNode).forEach((n: StateVisNode) => n.entered = true);
      tc.retained.map(getNode).forEach((n: StateVisNode) => n.retained = true);
      tc.exiting.map(getNode).forEach((n: StateVisNode)=> n.exited = true);
      tc.to.slice(-1).map(getNode).forEach((n: StateVisNode)=> { n.active = true; n.label = "active"});

      const applyClasses = (node) => {
        let classes = ["entered", "retained", "exited", "active", "inactive", "highlight"];
        node._classes = classes.reduce((str, clazz) => (str + (node[clazz] ? ` ${clazz} ` : '')), '');
      };

      nodes.forEach(applyClasses);

      this.setState({ nodes: nodes });
    });

    this.updateStates();
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
    this.deregisterFn && this.deregisterFn();
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

    let nodes = this.state.nodes;

    let tree = d3.layout.tree();
    let root = nodes.filter(state => state.name === "")[0];
    this.tree = tree(root);

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
    let known = this.state.nodes.map(Object.getPrototypeOf);
    let toAdd = states.filter(s => known.indexOf(s) === -1);
    let toDel = known.filter(s => states.indexOf(s) === -1);

    if (toAdd.length || toDel.length) {
      let nodes = this.state.nodes.slice();
      toAdd.map(s => Object.create(s)).forEach(n => nodes.push(n));
      // todo: del.forEach(blah)

      // Rebuild each node's children array
      nodes.forEach((n: any) => n.children = []);
      nodes.forEach((n: any) => {
        if (!n || !n.parent) return;
        let parentNode: any = this.nodeForState(nodes, n.parent);
        if (!parentNode) return;
        parentNode.children.push(n);
        n._parent = parentNode;
      });

      this.setState({ nodes }, this.doLayoutAnimation);
    }

    if (!this.unmounted) setTimeout(this.updateStates, 1000)
  };

  render() {
    const layout = (node) =>
        this.state.layout[node.name] ||
        { x: this.props.width / 2, y: this.props.height / 2 };
    let radius = this.props.radius || this.dimensions().radius;

    return (
        <div className="statevis" style={{  }} >
          <svg width={this.props.width} height={this.props.height}>

            { this.state.nodes.filter(node => node._linkPath).map(node =>
                <path key={node.name} d={node._linkPath} className='link'/>
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

