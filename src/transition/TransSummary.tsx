import { h, render, Component } from "preact";
import {KeysAndValues} from "./KeysAndValues";

export interface IProps {
  trans: any;
  status: string;
  rejection: string;
}

export interface IState {
  collapseFalsy: boolean;
}

export class TransSummary extends Component<IProps, IState> {
  state = { collapseFalsy: true };

  renderParameterValues() {
    const params = this.props.trans.params();
    const paramsByType = Object.keys(params).reduce((buckets, key) => {
      const val = params[key];
      const bucket = val === undefined ? 'undefined' : val === null ? 'null' : val === '' ? 'empty string' : 'other';
      buckets[bucket][key] = val;
      return buckets;
    }, { undefined: {}, null: {}, 'empty string': {}, other: {} });

    const falsyBuckets = Object.keys(paramsByType)
        .filter(key => key !== 'other')
        .map(key => ({ key, count: Object.keys(paramsByType[key]).length}))
        .filter(bucket => !!bucket.count);
    const falsyTotal = falsyBuckets.reduce((acc, bucket) => acc + bucket.count, 0);

    const collapse = this.state.collapseFalsy;

    return (
        <div className="uirTranVis_keysAndValues">
          <KeysAndValues
              data={paramsByType.other}
              labels={{ section: '', modalTitle: 'Parameter value: ' }}
              classes={{ outerdiv: '', keyvaldiv: 'uirTranVis_keyValue', section: '', _key: '', value: '' }}/>

          { !!falsyTotal && (
              <a href="" onClick={() => this.setState({ collapseFalsy: !collapse})}>
                {collapse ? 'show' : 'hide'} {falsyTotal} {falsyBuckets.map(bucket => bucket.key).join(' or ')} parameter values
              </a>
          )}

          { !this.state.collapseFalsy && (
            falsyBuckets.map(bucket => (
                <KeysAndValues key={bucket.key}
                    data={paramsByType[bucket.key]}
                    labels={{ section: '', modalTitle: 'Parameter value: ' }}
                    classes={{ outerdiv: '', keyvaldiv: 'uirTranVis_keyValue', section: '', _key: '', value: '' }}/>
            ))
          )}
        </div>
    )
  }

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

        <div className="uirTranVis_summaryHeading">Parameter Values: </div>

        {this.renderParameterValues()}
      </div>
    )
  }
}
