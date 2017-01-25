import * as React from "react";
import {PopoverHeading} from "./popoverHeading";
import {TransSummary} from "./transSummary";
import {NodePaths} from "./nodePaths";
import EventHandler = React.EventHandler;
import MouseEvent = React.MouseEvent;

export interface IProps {
  transition: any;
  status: string;
  rejection: string;

  pinned: boolean;
  expanded: boolean;
  open: boolean;
  togglePinned: EventHandler<MouseEvent>;
  toggleExpand: EventHandler<MouseEvent>;
}

export interface IState {
}

export class TransitionPopover extends React.Component<IProps, IState> {
  render() {
    if (!this.props.open && !this.props.pinned) return null;

    const classes = () => "transitionDetail uir-panel panel-default " +
        (this.props.pinned ? "pin " : "") +
        (this.props.expanded ? "expand " : "") +
        (this.props.open ? "showDetail " : "");

    return (
      <div className={ classes() }>
        <PopoverHeading
            transition={this.props.transition}
            pinned={this.props.pinned} expanded={this.props.expanded}
            togglePinned={this.props.togglePinned} toggleExpand={this.props.toggleExpand}
        />

        <div className="uir-panel-body">
          <TransSummary trans={this.props.transition} status={this.props.status} rejection={this.props.rejection} />
          <hr/>
          <NodePaths transition={this.props.transition} />
        </div>

        <div className="downArrow" />
      </div>
    )
  }
}
