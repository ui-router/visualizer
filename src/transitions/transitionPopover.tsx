import * as React from "react";
import {Transition} from "angular-ui-router";
import {PopoverHeading} from "./popoverHeading";
import {TransSummary} from "./transSummary";
import {NodePaths} from "./nodePaths";

export interface IProps {
  trans: Transition;
  status: string;
  rejection: string;

  pinned: boolean;
  expanded: boolean;
  open: boolean;
  togglePinned: Function;
  toggleExpand: Function;
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
            trans={this.props.trans}
            pinned={this.props.pinned} expanded={this.props.expanded}
            togglePinned={this.props.togglePinned} toggleExpand={this.props.toggleExpand}
        />

        <div className="uir-panel-body">
          <TransSummary trans={this.props.trans} status={this.props.status} rejection={this.props.rejection} />
          <hr/>
          <NodePaths trans={this.props.trans} />
        </div>

        <div className="downArrow" />
      </div>
    )
  }
}
