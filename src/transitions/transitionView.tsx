import * as React from "react";
import {TargetState, Transition} from "angular-ui-router";
import {TransitionPopover} from "./transitionPopover";
import {BreadcrumbArrow} from "./breadcrumbArrow";
import {maxLength} from "../util/strings";
import {makeCancelable} from "../util/cancelablePromise";

export interface IProps {
  trans: Transition;
}

export interface IState {
  status: string;
  message: string;
  rejection: string;
  pinned: boolean,
  expanded: boolean,
  open: boolean,
  deregisterFunctions: Function[],
}

export class TransitionView extends React.Component<IProps, IState> {
  transitionPromise = null;

  state = {
    status: 'running',
    message: null,
    rejection: null,
    pinned: false,
    expanded: false,
    open: false,
    deregisterFunctions: []
  };

  componentDidMount() {
    let trans = this.props.trans;

    const setMessage = message => {
      // Transition hooks are computed when the trans starts; they can't be removed while the trans is running.
      if (!this.transitionPromise.isCanceled)  {
        this.mergeState({message});
      }
    };
    const statename = state => state.name || "(root)";

    let fns = [];
    fns.push(trans.onStart({},  ()         => setMessage("Starting..."),                  {priority: 10000}));
    fns.push(trans.onExit({},   (t, state) => setMessage(`Exiting ${statename(state)}`),  {priority: 10000}));
    fns.push(trans.onRetain({}, (t, state) => setMessage(`Retained ${statename(state)}`), {priority: 10000}));
    fns.push(trans.onEnter({},  (t, state) => setMessage(`Entering ${statename(state)}`), {priority: 10000}));
    fns.push(trans.onFinish({}, ()         => setMessage(`Finishing...`)));

    this.mergeState({ deregisterFunctions: fns });

    const success = () => this.mergeState({status: "success", message: null});
    const error = (err) => {
      if (err.isCanceled) return;

      let status = "error", rejection = null;

      if (err) {
        rejection = err && err.message;

        let type = err && err.type;
        if (type == 2 && err.redirected === true) {
          status = "redirected";
          let targetState = error['detail'] as TargetState;
          let toState = targetState.name();
          let toParams = JSON.stringify(targetState.params());
          rejection = maxLength(100, `${toState}(${toParams}`) + ")";
        }

        if (type == 5) {
          status = "ignored";
          rejection = "All states and parameters in the To and From paths are identical."
        }
      }

      this.mergeState({status, rejection, message: null});
    };

    this.transitionPromise = makeCancelable(trans.promise);
    this.transitionPromise.promise.then(success, error);
  }

  componentWillUnmount() {
    this.transitionPromise.cancel();
    if (this.state.deregisterFunctions) {
      this.state.deregisterFunctions.forEach(fn => fn());
    }
  }

  mergeState(object) {
    this.setState(Object.assign({}, this.state, object));
  }

  togglePin() {
    this.mergeState({pinned: !this.state.pinned});
  }

  toggleExpand() {
    this.mergeState({expanded: !this.state.expanded});
  }

  toggleOpen() {
    this.mergeState({open: !this.state.open});
  }

  render() {
    const open = () => this.mergeState({open: true});
    const close = () => this.mergeState({open: false});

    return (
        <div onMouseEnter={ open } onMouseLeave={ close }>

          <TransitionPopover
              trans={this.props.trans}
              status={this.state.status}
              rejection={this.state.rejection}
              pinned={this.state.pinned}
              expanded={this.state.expanded}
              open={this.state.open}
              togglePinned={this.togglePin.bind(this)}
              toggleExpand={this.toggleExpand.bind(this)}/>

          <BreadcrumbArrow
              trans={this.props.trans}
              status={this.state.status}
              message={this.state.message}
              toggleExpand={this.toggleExpand.bind(this)}/>

        </div>
    )
  }
}
