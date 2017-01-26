import { h, render, Component } from "preact";
import {StateVisNode} from "./interface";

export interface IProps {
  router: any;
  node: StateVisNode;
  radius: number;
  x: number;
  y: number;
}
export interface IState { }
export class StateNode extends Component<IProps, IState> {
  selectState = () => {
    this.props.router.stateService.go(this.props.node.name);
  };

  render() {
    let node = this.props.node;
    let {x, y, radius} = this.props;
    let classes = node._classes;

    return (
        <g>
          <path className={classes} r="10" cx={x} cy={y}/>

          <circle
              onClick={this.selectState}
              className={classes}
              r="10"
              cx={x}
              cy={y}/>

          <text
              className="name"
              textAnchor="middle"
              transform={`rotate(-12 ${x} ${y})`}
              x={x}
              y={y - radius}>
            {node.name}
          </text>

          <text className="label" textAnchor="middle" x={x} y={y + radius + 10}>
            {node.label}
          </text>
        </g>
    )
  }
}
