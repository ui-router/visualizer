import { h, render, Component } from "preact";
import {Modal} from "../util/modal";
import {ResolveData} from "./ResolveData";
import {maxLength} from "../util/strings";

const isObject = (val) => typeof val === 'object';

const displayValue = function (object) {
  if (object === undefined) return "undefined";
  if (object === null) return "null";
  if (typeof object === 'string') return <span className="uirTranVis_code">"{maxLength(100, object)}"</span>;
  if (Array.isArray(object)) return "[Array]";
  if (isObject(object)) return "[Object]";
  if (typeof object.toString === 'function') return maxLength(100, object.toString());
  return object;
};

export interface IProps {
  data: any;
  labels: {
    section?: string;
    modalTitle?: string;
  }
  classes: {
    outerdiv?: string;
    section?: string;
    keyvaldiv?: string;
    _key?: string;
    value?: string;
  }
}

export interface IState {

}

let defaultClass = {
  outerdiv: 'param',
  keyvaldiv: 'uirTranVis_keyValue',
  section: 'uirTranVis_paramsLabel uirTranVis_deemphasize',
  _key: 'uirTranVis_paramId',
  value: 'uirTranVis_paramValue'
};

export class KeysAndValues extends Component<IProps, IState> {
  isEmpty = () =>
      !this.props.data || Object.keys(this.props.data).length === 0;

  classFor = (name) =>
      this.props.classes && this.props.classes[name] !== undefined ?
          this.props.classes[name] :
          defaultClass[name];

  renderValue = (key: string, val: any) => {
    if (isObject(val)) return (
        <span className="link" onClick={() => Modal.show(this.props.labels, key, val, ResolveData)}>[Object]</span>
    );

    return (
        <div className={this.props.classes.value}>
          {displayValue(val)}
        </div>
    );
  };

  render() {
    if (this.isEmpty()) return null;

    const keys = Object.keys(this.props.data);

    const defineds = keys.filter(key => this.props.data[key] !== undefined);
    const undefineds = keys.filter(key => this.props.data[key] === undefined);

    const renderKeyValues = (keys) => 
        keys.map(key =>
          <div key={key} className={this.classFor('keyvaldiv')}>
            <div className={this.classFor('_key')}>
              {key}:
            </div>

            <div className={this.classFor('value')}>
              {this.renderValue(key, this.props.data[key])}
            </div>
          </div>
        );

    const renderUndefineds = (keys) => renderKeyValues([keys.join(', ')]);

    return (
      <div className={this.classFor('outerdiv')}>
        <div className={this.classFor('section')}>
          {this.props.labels.section}
        </div>

        {renderKeyValues(defineds)}

        {/* { undefineds.length <= 2 && <KeyValues keys={undefineds} /> } */}
        { undefineds.length > 2 && renderUndefineds(undefineds) }

      </div>
    )

  }
}
