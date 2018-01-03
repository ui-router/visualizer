import { h, Component } from "preact";
import { KeysAndValues } from './KeysAndValues';

export interface IProps {
  trans: any;
  status: string;
  rejection: string;
}

export class TransSummary extends Component<IProps, {}> {


  render() {
    return (
      <div className="uirTranVis_transSummary">
        <div className="uirTranVis_summaryData">
          <span>From:</span><strong>{ this.props.trans.from().name || '(root)' }</strong>
        </div>

        <div className="uirTranVis_summaryData">
          <span>To:</span><strong>{ this.props.trans.to().name || '(root)' }</strong>
        </div>

        <div className="uirTranVis_summaryData">
          <span>Result:</span>
          <div>
            <strong>{this.props.status}</strong>
            {this.props.rejection ? <span>: {this.props.rejection}</span> : null}
          </div>
        </div>

        <div className="uirTranVis_summaryHeading">Parameter Values:</div>

        <div>
          <KeysAndValues
              groupedValues={KeysAndValues.falsyGroupDefinitions}
              enableGroupToggle={true}
              data={this.props.trans.params()}
              modalTitle="Parameter value"
              classes={{ div: 'uirTranVis_keyValue', key: '', val: '' }}>
          </KeysAndValues>
        </div>
      </div>
    )
  }
}
