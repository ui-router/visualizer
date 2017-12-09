import { h, render, Component } from "preact";
import {KeysAndValues} from "./KeysAndValues";

export interface IProps {
  trans: any;
  status: string;
  rejection: string;
}

export interface IState { }

export class TransSummary extends Component<IProps, IState> {
  render() {
    return (
      <table className="uirTranVis_transSummary">
      <tbody>
        <tr><td>From State:</td><td>{ this.props.trans.from().name || '(root)' }</td></tr>
        <tr><td>To State:</td><td>{this.props.trans.to().name || '(root)'}</td></tr>
        <tr>
          <td colSpan={1}>Parameters:</td>
          <td colSpan={1}>
            <KeysAndValues
                data={this.props.trans.params()}
                labels={{ section: '', modalTitle: 'Parameter value: ' }}
                classes={{ outerdiv: '', keyvaldiv: 'uirTranVis_keyValue', section: '', _key: '', value: '' }}>
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

  render2() {
    return (
      <table className="uirTranVis_transSummary">
      <tbody>
        <tr><td>From State:</td><td>{ this.props.trans.from().name || '(root)' }</td></tr>
        <tr><td>To State:</td><td>{this.props.trans.to().name || '(root)'}</td></tr>
        <tr>
          <td colSpan={1}>Parameters:</td>
          <td colSpan={1}>
            <KeysAndValues
                data={this.props.trans.params()}
                labels={{ section: '', modalTitle: 'Parameter value: ' }}
                classes={{ outerdiv: '', keyvaldiv: 'uirTranVis_keyValue', section: '', _key: '', value: '' }}>
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
