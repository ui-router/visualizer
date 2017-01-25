import * as React from "react";
import EventHandler = React.EventHandler;
import MouseEvent = React.MouseEvent;

export interface IProps {
  transition: any;

  pinned: boolean;
  expanded: boolean;
  togglePinned: EventHandler<MouseEvent>;
  toggleExpand: EventHandler<MouseEvent>;
}

export interface IState {
}

export class PopoverHeading extends React.Component<IProps, IState> {
  render() {
    const tackClass = () => "uir-icon uir-icon-thumb-tack " + (this.props.pinned ? "" : "uir-rotate-35");
    const expandClass = () => "uir-icon tooltip-right " + (this.props.expanded ? "uir-icon-toggle-on" : "uir-icon-toggle-off");

    return (
      <div className="uir-panel-heading uir-header">
        <div style={{ cursor: "pointer" }} onClick={this.props.togglePinned}>
          <i className={ tackClass() } />
        </div>

        <h3 className="uir-panel-title">Transition #{ this.props.transition.$id }</h3>

        <div style={{ cursor: "pointer" }} onClick={this.props.toggleExpand}>
          <i className={ expandClass() }/>
        </div>
      </div>
    )
  }
}
