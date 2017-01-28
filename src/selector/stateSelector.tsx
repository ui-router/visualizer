import { h, render, Component } from "preact";

export interface IProps {
  router;
}

export interface IState {
  current?: string;
  states?: string[];
  deregisterFn?: Function;
}

export class StateSelector extends Component<IProps, IState> {
  deregisterStateListenerFn: Function;

  state = {
    current: null,
    states: [],
    deregisterFn: null
  };

  componentDidMount() {
    let router = this.props.router;
    
    const updateStates = () => 
        this.setState({ states: router.stateRegistry.get().map(state => state.name) });
    const updateCurrent = (trans) =>
        this.setState({current: trans.to().name});
    
    if (router.stateRegistry.onStatesChanged) {
      this.deregisterStateListenerFn = router.stateRegistry.onStatesChanged(updateStates);
    }

    let deregisterFn = router.transitionService.onSuccess({}, updateCurrent);

    this.setState({ current: router.globals.current.name, states: [], deregisterFn });
    updateStates();
  }

  componentWillUnmount() {
    if (this.state.deregisterFn) {
      this.state.deregisterFn();
    }
    if (this.deregisterStateListenerFn) {
      this.deregisterStateListenerFn();
    }
  }

  selectState = (event) => {
    let $state = this.props.router.stateService;
    var to = event.target.value;
    if (to) $state.go(to);
  };

  render() {
    return (
        <select value={this.state.current || ""} onChange={this.selectState} style={{ maxWidth: 120 }}>
          <option value="">Choose a state</option>
          { this.state.states.map(state =>
              <option key={state} value={state}>{state}</option>
          ) }
        </select>
    )
  }
}
