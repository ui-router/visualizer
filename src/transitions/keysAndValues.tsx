import * as React from "react";
import * as ReactDOM from "react-dom";
import {app} from "../statevis.module";
import {Modal} from "../util/modal";
import {ResolveData} from "./resolveData";

const truncateTo = (len, str) =>
    str.length > len ? str.substr(0, len - 3) + "..." : str;

const isObject = (val) =>
    typeof val === 'object' && !Array.isArray(val);

const displayValue = function (object) {
  if (object === undefined) return "undefined";
  if (object === null) return "null";
  if (angular.isString(object)) return '"' + truncateTo(100, object) + '"';
  if (isObject(object)) return "[Object]";
  if (typeof object.toString === 'function') return truncateTo(100, object.toString());
  return object;
};

export interface IProps {
  data: any;
  unwrapData: Function;
  labels: {
    section: string;
  }
  classes: {
    outerdiv: string;
    section: string;
    keyvaldiv: string;
    _key: string;
    value: string;
  }
}

export interface IState {

}

let defaultClass = {
  outerdiv: 'param',
  keyvaldiv: 'keyvalue',
  section: 'paramslabel deemphasize',
  key: 'paramid',
  value: 'paramvalue'
};

export class KeysAndValues extends React.Component<IProps, IState> {
  isEmpty = () =>
      !this.props.data || Object.keys(this.props.data).length === 0;

  unwrapData = (data) =>
      this.props.unwrapData ? this.props.unwrapData(data) : data;

  class = (name) =>
      (this.props.classes && this.props.classes[name]) || defaultClass[name];

  render() {
    const renderValue = (key, val) => {
      if (isObject(val)) return (
        <span className="link" onClick={() => Modal.show(this.props.labels, key, val, ResolveData)}>[Object]</span>
      );

      return (
        <div className={this.props.classes.value}>
          {displayValue(val)}
        </div>
      );
    };

    return this.isEmpty() ? null : (
      <div className={this.class('outerdiv')}>
        <div className={this.class('section')}>
          {this.props.labels.section}
        </div>

        { Object.keys(this.props.data).map(key =>
          <div key={key} className={this.class('keyvaldiv')}>
            <div className={this.class('_key')}>
              {key}:
            </div>

            <div className={this.class('value')}>
              {renderValue(key, this.props.data[key])}
            </div>
          </div>
        ) }

      </div>
    )

  }
}

app.directive('keysAndValues', reactDirective => reactDirective(KeysAndValues, ['data', 'unwrapData', 'labels', 'classes']))
