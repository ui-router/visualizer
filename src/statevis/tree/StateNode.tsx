import { h, render, Component } from "preact";
import { Renderer } from "../interface";
import { StateVisNode } from "./stateVisNode";

export interface IProps {
  router: any;
  node: StateVisNode;
  renderer: Renderer;
  doLayout: Function;
  x: number;
  y: number;
}

export interface IState { }
export class StateNode extends Component<IProps, IState> {
  goTimeout = null;

  handleCollapseClicked = (event) => {
    clearTimeout(this.goTimeout);
    this.props.node._collapsed = !this.props.node._collapsed;
    this.props.doLayout();
  };

  handleGoClicked = (event) => {
    clearTimeout(this.goTimeout);
    let stateName = this.props.node.name;
    stateName = stateName.replace(/\.\*\*$/, "");
    this.goTimeout = setTimeout(() => this.props.router.stateService.go(stateName), 200);
  };

  render() {
    let renderer = this.props.renderer;
    let {node, x, y} = this.props;

    let { baseRadius, baseFontSize, baseNodeStrokeWidth, zoom } = renderer;
    let r = baseRadius * zoom;

    let fontSize = baseFontSize * zoom;
    let nodeStrokeWidth = (baseNodeStrokeWidth * (node.entered ? 1.5 : 1) * zoom);

    let classes = ["entered", "retained", "exited", "active", "inactive", "future", "highlight", "collapsed"];
    let circleClasses = classes.reduce((str, clazz) => (str + (node[clazz] ? ` ${clazz} ` : '')), '');

    let descendents = node.collapsed ? node.totalDescendents : 0;

    return (
        <g transform={`translate(${x}, ${y})`} onClick={this.handleGoClicked} onDblClick={this.handleCollapseClicked}>

          <circle className={circleClasses} stroke-width={nodeStrokeWidth} r={r}/>

          { !node.collapsed ? "" :
            <text className="label"
                  text-anchor="middle"
                  font-size={fontSize * (descendents < 10 ? 1.0 : 0.8)}
            >
              ({descendents})
            </text>
          }

          { renderer.labelRenderFn(x, y, node, renderer) }

          <text className="label"
              text-anchor="middle"
              font-size={fontSize}
              transform={`translate(0, ${r*2})`}
          >
            {node.label}
          </text>
        </g>
    )
  }
}
