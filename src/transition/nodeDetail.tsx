import { h, render, Component } from "preact";
import {stringify, maxLength} from "../util/strings";
import {KeysAndValues} from "./keysAndValues";
import {Transition} from '@uirouter/core';

export interface IProps {
  node: any;
  type: string;
}

export interface IState {

}

export class NodeDetail extends Component<IProps, IState> {
  stateName() {
    let node = this.props.node;
    let name = node && node.state && node.state.name;
    if (name === "") name = "(root)";
    return name && name.split(".").reverse()[0];
  }

  params() {
    let node = this.props.node;
    return node && node.paramSchema.reduce((params, param) => {
      params[param.id] = node.paramValues[param.id];
      return params;
    }, {});
  }

  resolves() {
    const asString = (val) =>
        typeof val === 'string' ? val : maxLength(30, stringify(val));

    let node = this.props.node;
    let ignoredTokens = ['$stateParams', '$transition$', '$state$', Transition];

    return node && node.resolvables
            .filter(r => ignoredTokens.indexOf(r.token) === -1)
            .reduce((acc, r) => { acc[asString(r.token)] = r.data; return acc; }, {});
  }

  render() {
    return !this.props.node ? null : (
        <div className="uirNodeDetail">
          <div className="uir-header">
            <div className="nowrap deemphasize">({ this.props.type } state)</div>
            <div className="statename">{ this.stateName() }</div>
          </div>

          <KeysAndValues data={this.params()}
                         classes={{ outerdiv: 'params', section: 'paramslabel deemphasize' }}
                         labels={{ section: 'Parameter values', modalTitle: 'Parameter value: ' }}
          />

          <KeysAndValues data={this.resolves()}
                         classes={{ outerdiv: 'params resolve', section: 'resolvelabel deemphasize' }}
                         labels={{ section: 'Resolved data', modalTitle: 'Resolved value: ' }}
          />
        </div>
    )
  }

}
