import { h, Component } from 'preact';
import { Renderer } from '../interface';
import { NodeOptions } from './StateTree';
import { StateVisNode } from './stateVisNode';

export interface IProps {
  router: any;
  node: StateVisNode;
  nodeOptions: NodeOptions;
  renderer: Renderer;
  doLayout: Function;
  x: number;
  y: number;
}

export interface IState {}
export class StateNode extends Component<IProps, IState> {
  goTimeout = null;

  handleCollapseClicked = () => {
    clearTimeout(this.goTimeout);
    this.props.node._collapsed = !this.props.node._collapsed;
    this.props.doLayout();
  };

  handleGoClicked = () => {
    clearTimeout(this.goTimeout);
    let stateName = this.props.node.name;
    stateName = stateName.replace(/\.\*\*$/, '');
    this.goTimeout = setTimeout(() => this.props.router.stateService.go(stateName), 200);
  };

  render() {
    let renderer = this.props.renderer;
    let { node, x, y, nodeOptions } = this.props;

    let { baseRadius, baseFontSize, baseNodeStrokeWidth, zoom } = renderer;
    let r = baseRadius * zoom;

    let fontSize = baseFontSize * zoom;
    let nodeStrokeWidth = baseNodeStrokeWidth * (node.entered ? 1.5 : 1) * zoom;

    let defaultClasses = [
      'entered',
      'retained',
      'exited',
      'active',
      'inactive',
      'future',
      'highlight',
      'collapsed',
    ].filter(clazz => node[clazz]);
    let nodeClasses = nodeOptions.classes ? nodeOptions.classes(node) : '';
    let circleClasses = defaultClasses + nodeClasses;
    let descendents = node.collapsed ? node.totalDescendents : 0;

    return (
      <g transform={`translate(${x}, ${y})`} onClick={this.handleGoClicked} onDblClick={this.handleCollapseClicked}>
        <circle className={circleClasses} stroke-width={nodeStrokeWidth} r={r} />

        {!node.collapsed ? (
          ''
        ) : (
          <text className="label" text-anchor="middle" font-size={fontSize * (descendents < 10 ? 1.0 : 0.8)}>
            ({descendents})
          </text>
        )}

        {renderer.labelRenderFn(x, y, node, renderer)}

        <text className="label" text-anchor="middle" font-size={fontSize} transform={`translate(0, ${r * 2})`}>
          {node.label}
        </text>
      </g>
    );
  }
}
