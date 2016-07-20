import * as React from "react";

export interface IProps {
  router;
}

export interface IState {
  current?: string;
  states?: string[];
  deregisterFn?: Function;
}

export class StateSelector extends React.Component<IProps, IState> {
  state = {
    current: null,
    states: [],
    deregisterFn: null
  };

  componentDidMount() {
    let router = this.props.router;
    let states = router.stateRegistry.get().map(state => state.name);

    var updateCurrent = (trans) => this.setState({current: trans.to().name});
    let deregisterFn = router.transitionService.onSuccess({}, updateCurrent);

    this.setState({ current: router.globals.current.name, states, deregisterFn });
  }

  componentWillUnmount() {
    if (this.state.deregisterFn) {
      this.state.deregisterFn();
    }
  }

  selectState = (event) => {
    let $state = this.props.router.stateService;
    var to = event.target.value;
    if (to) $state.go(to);
  };

  render() {
    return (
        <select value={this.state.current || ""} onChange={this.selectState}>
          <option value="">Choose a state</option>
          { this.state.states.map(state =>
              <option key={state} value={state}>{state}</option>
          ) }
        </select>
    )
  }
}
