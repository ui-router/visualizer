import * as React from "react";
import {Transition, TransitionService} from "angular-ui-router";
import {TransitionView} from "./transitionView";
import {easing} from "../easing";
import {animatePath} from "../d3ng";
import {app} from "../statevis.module";

export interface IProps {
  $trans: TransitionService;
  maximumTransitions?: number;
}

export interface IState {
  transitions?: Transition[];
  deregisterListener?: Function;
}

/**
 * This outer component manages the list of all transitions (history), and provides a fixed, scrolling viewport.
 * It attaches hooks for lifecycle events and decorates the transition with a descriptive message.
 */
export class TransitionsVisualizer extends React.Component<IProps, IState> {
  state = {
    transitions: [],
    deregisterListener: null
  };

  static defaultProps = {
    maximumTransitions: 15
  };

  _div;
  cancelPreviousAnim = null;

  componentDidMount() {
    this.props.$trans.onBefore({}, (trans: Transition) => {
      this.setState({ transitions: this.state.transitions.concat(trans) });

      let duration = 750, el = this._div.children[0];

      let scrollToRight = () => {
        let targetScrollX = el.scrollWidth - el.clientWidth;
        this.cancelPreviousAnim && this.cancelPreviousAnim();
        let newVal = [targetScrollX], oldVal = [el.scrollLeft];
        let max = this.props.maximumTransitions;

        let enforceMax = () => {
          let list = this.state.transitions;
          if (list.length <= max) return;
          this.setState({ transitions: list.slice(list.length - max)});
        };

        let callback = (vals) => el.scrollLeft = vals[0];
        this.cancelPreviousAnim = animatePath(newVal, oldVal, duration, callback, enforceMax, easing.easeInOutCubic);
      };

      setTimeout(scrollToRight, 250);
    });
  }

  componentWillUnmount() {
    if (this.state.deregisterListener) {
      this.state.deregisterListener();
    }
  }

  render() {
    return (
      <div ref={el => this._div = el}>
        <div className="transitionHistory">
          { this.state.transitions.map(trans =>
            <div key={trans.$id}>
              <TransitionView trans={trans} />
              <div style={{minWidth: "18em", border: "1px solid transparent"}}></div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

app.directive('transitionsVisualizer', reactDirective => reactDirective(TransitionsVisualizer, ['$trans', 'maximumTransitions']));
