import { h, render, Component } from 'preact';

export interface IProps {
  transition: any;

  pinned: boolean;
  expanded: boolean;
  togglePinned: any;
  toggleExpand: any;
}

export interface IState {}

export class PopoverHeading extends Component<IProps, IState> {
  render() {
    const tackClass = () => 'uir-icon uir-icon-thumb-tack ' + (this.props.pinned ? '' : 'uir-rotate-35');
    const expandClass = () =>
      'uir-icon uirTranVis_tooltipRight ' + (this.props.expanded ? 'uir-icon-toggle-on' : 'uir-icon-toggle-off');

    return (
      <div className="uirTranVis_panelHeading uirTranVis_heading">
        <div style={{ cursor: 'pointer' }} onClick={this.props.togglePinned}>
          <i className={tackClass()} />
        </div>

        <h3 className="uirTranVis_panelTitle">Transition #{this.props.transition.$id}</h3>

        <div style={{ cursor: 'pointer' }} onClick={this.props.toggleExpand}>
          <i className={expandClass()} />
        </div>
      </div>
    );
  }
}
