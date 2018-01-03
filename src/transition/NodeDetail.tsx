import { h, render, Component } from "preact";
import { stringify, maxLength } from "../util/strings";
import { KeysAndValues } from "./KeysAndValues";
import { Transition } from '@uirouter/core';

export interface IProps {
  trans: Transition;
  node: any;
  type: string;
}

export class NodeDetail extends Component<IProps, {}> {
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
    let ignoredTokens = ['$stateParams', '$transition$', '$state$', this.props.trans.constructor];

    return node && node.resolvables
            .filter(r => ignoredTokens.indexOf(r.token) === -1)
            .reduce((acc, r) => { acc[asString(r.token)] = r.data; return acc; }, {});
  }

  render() {
    if (!this.props.node) return null;
    const params = this.params();
    const resolves = this.resolves();

    return !this.props.node ? null : (
        <div className="uirTranVis_nodeDetail">
          <div className="uirTranVis_heading">
            <div className="uirTranVis_nowrap uirTranVis_deemphasize">({ this.props.type } state)</div>
            <div className="uirTranVis_stateName">{ this.stateName() }</div>
          </div>

          {!!Object.keys(params).length && (
              <div className="params">
                <div className="uirTranVis_paramsLabel uirTranVis_deemphasize">
                  Parameter values
                </div>

                <KeysAndValues data={this.params()} classes={{ div: 'uirTranVis_keyValue' }} modalTitle="Parameter value"/>
              </div>
          )}

          {!!Object.keys(resolves).length && (
              <div className="params resolve">
                <div className="uirTranVis_resolveLabel uirTranVis_deemphasize">
                  Resolved data
                </div>

                <KeysAndValues data={this.resolves()} classes={{ div: 'uirTranVis_keyValue' }} modalTitle="Resolved value"/>
              </div>
          )}
        </div>
    )
  }

}
