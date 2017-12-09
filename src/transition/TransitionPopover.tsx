import { h, render, Component } from "preact";
import {PopoverHeading} from "./PopoverHeading";
import {TransSummary} from "./TransSummary";
import {NodePaths} from "./NodePaths";

export interface IProps {
  transition: any;
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

export class TransitionPopover extends Component<IProps, IState> {
  render() {
    if (!this.props.open && !this.props.pinned) return null;

    const classes = () => "uirTranVis_transitionDetail uirTranVis_panel panel-default " +
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

        <div className="uirTranVis_panelBody">
          <TransSummary trans={this.props.transition} status={this.props.status} rejection={this.props.rejection} />
          <hr/>
          <NodePaths transition={this.props.transition} />
        </div>

        <div className="uirTranVis_downArrow" />
      </div>
    )
  }
}
