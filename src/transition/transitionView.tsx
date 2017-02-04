import { h, render, Component } from "preact";
import {TransitionPopover} from "./transitionPopover";
import {BreadcrumbArrow} from "./breadcrumbArrow";
import {maxLength} from "../util/strings";
import {makeCancelable} from "../util/cancelablePromise";

export interface IProps {
  transition: any;
}

export interface IState {
  status?: string;
  message?: string;
  rejection?: string;
  pinned?: boolean,
  expanded?: boolean,
  open?: boolean,
  deregisterFunctions?: Function[],
}

export class TransitionView extends Component<IProps, IState> {
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
    let trans = this.props.transition;

    const setMessage = message => {
      // Transition hooks are computed when the trans starts; they can't be removed while the trans is running.
      if (!this.transitionPromise.isCanceled)  {
        this.setState({message});
      }
    };
    const statename = state => state.name || "(root)";

    let fns = [];
    fns.push(trans.onStart({},  ()         => setMessage("Starting..."),                  {priority: 10000}));
    fns.push(trans.onExit({},   (t, state) => setMessage(`Exiting ${statename(state)}`),  {priority: 10000}));
    fns.push(trans.onRetain({}, (t, state) => setMessage(`Retained ${statename(state)}`), {priority: 10000}));
    fns.push(trans.onEnter({},  (t, state) => setMessage(`Entering ${statename(state)}`), {priority: 10000}));
    fns.push(trans.onFinish({}, ()         => setMessage(`Finishing...`)));

    this.setState({ deregisterFunctions: fns });

    const success = () => this.setState({status: "success", message: null});
    const error = (err) => {
      if (err && err.isCanceled) return;

      let status = "error", rejection = null;

      if (err) {
        rejection = err && err.message;

        let type = err && err.type;
        if (type == 2 && err.redirected === true) {
          status = "redirected";
          let targetState = err['detail'];
          let toState = targetState.name();
          let toParams = JSON.stringify(targetState.params());
          rejection = maxLength(100, `${toState}(${toParams}`) + ")";
        }

        if (type == 5) {
          status = "ignored";
          rejection = "All states and parameters in the To and From paths are identical."
        }
      }

      this.setState({status, rejection, message: null});
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

  togglePin = () => this.setState({pinned: !this.state.pinned});
  toggleExpand = () => this.setState({expanded: !this.state.expanded});
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });

  render() {
    return (
        <div onMouseEnter={ this.open } onMouseLeave={ this.close }>

          <TransitionPopover
              transition={this.props.transition}
              status={this.state.status}
              rejection={this.state.rejection}
              pinned={this.state.pinned}
              expanded={this.state.expanded}
              open={this.state.open}
              togglePinned={this.togglePin}
              toggleExpand={this.toggleExpand}/>

          <BreadcrumbArrow
              transition={this.props.transition}
              status={this.state.status}
              message={this.state.message}
              toggleExpand={this.toggleExpand}/>

        </div>
    )
  }
}
