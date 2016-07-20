import * as React from "react";

export interface IProps {
  transition: any;

  pinned: boolean;
  expanded: boolean;
  togglePinned: Function;
  toggleExpand: Function;
}

export interface IState {
}

export class PopoverHeading extends React.Component<IProps, IState> {
  render() {
    const tackClass = () => "fa fa-thumb-tack " + (this.props.pinned ? "" : "fa-rotate-45 text-muted");
    const expandClass = () => "fa tooltip-right " + (this.props.expanded ? "fa-toggle-on" : "fa-toggle-off");

    return (
      <div className="uir-panel-heading uir-header">
        <button className="btn btn-default btn-xs pinButton" onClick={this.props.togglePinned}>
          <i className={ tackClass() } />
        </button>

        <h3 className="uir-panel-title">Transition #{ this.props.transition.$id }</h3>

        <div style={{ cursor: "pointer" }} onClick={this.props.toggleExpand}>
          <i className={ expandClass() } title="Show Details" />
        </div>
      </div>
    )
  }
}
