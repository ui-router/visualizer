import { h, render, Component } from "preact";
import { StateVisNode, Renderer } from "./interface";

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
  handleStateClicked = (event) => {
    if (event.shiftKey) {
      this.props.node.collapsed = !this.props.node.collapsed;
      this.props.doLayout();
    } else {
      this.props.router.stateService.go(this.props.node.name);
    }
  };

  render() {
    let renderer = this.props.renderer;
    let {node, x, y} = this.props;

    let { baseRadius, baseFontSize, baseStrokeWidth, baseNodeStrokeWidth, zoom } = renderer;
    let r = baseRadius * zoom;
    let fontSize = baseFontSize * zoom;
    let nodeStrokeWidth = (baseNodeStrokeWidth * (node.entered ? 1.5 : 1) * zoom);

    let classes = node._classes;

    return (
        <g transform={`translate(${x}, ${y})`}>
          <path className={classes} r={r} cx={x} cy={y}/>

          <circle
              onClick={this.handleStateClicked}
              className={classes}
              stroke-width={nodeStrokeWidth}
              r={r}/>

          { renderer.labelRenderFn(x, y, node, renderer) }

          { this.props.node.collapsed ? <text
              text-anchor="middle"
              font-size={fontSize}
          > + </text> : null }

          <text
              className="label"
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
