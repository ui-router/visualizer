import * as React from "react";
import {KeysAndValues} from "./keysAndValues";

export interface IProps {
  trans: any;
  status: string;
  rejection: string;
}

export interface IState { }

export class TransSummary extends React.Component<IProps, IState> {
  render() {
    return (
      <table className="summary">
      <tbody>
        <tr><td>From State:</td><td>{ this.props.trans.from().name || '(root)' }</td></tr>
        <tr><td>To State:</td><td>{this.props.trans.to().name || '(root)'}</td></tr>
        <tr>
          <td colSpan={1}>Parameters:</td>
          <td colSpan={1}>
            <KeysAndValues
                data={this.props.trans.params()}
                labels={{ section: '', modalTitle: 'Parameter value: ' }}
                classes={{ outerdiv: '', keyvaldiv: 'keyvalue', section: '', _key: '', value: '' }}>
            </KeysAndValues>
          </td>
        </tr>

        <tr>
          <td>Outcome:</td>
          <td>
            { this.props.status }
            { this.props.rejection
                ? <span>: {this.props.rejection}</span>
                : null }
          </td>
        </tr>
      </tbody>
      </table>
    )
  }
}
