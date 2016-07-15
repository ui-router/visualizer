import * as React from "react";
import * as ReactDOM from "react-dom";
import {Modal} from "../util/modal";
let T = React.PropTypes;

export interface IProps {
  toggles?: any;
  labels?: any;
  open?: boolean;
  close?: Function;
  id?: string;
  value?: any;
}

export class ResolveData extends React.Component<IProps,any> {
  close() {
    if (this.props.close) {
      this.props.close();
    }
  }

  static propTypes = {
    toggles: T.object,
    labels: T.object,
    open: T.bool,
    close: T.func,
    id: T.string,
    value: T.object
  };

  render() {
    if (this.props.toggles.modal !== this.props.id) return null;

    console.log(this.props.value)
    return (
        <div>
          <Modal open={this.props.open} close={this.close.bind(this)}>

            <div className="uir-modal-header uir-resolve-header">
              <div style={{"fontSize": "1.5em"}}>{this.props.labels.modalTitle}: {this.props.id}</div>
              <button className="btn btn-primary" onClick={this.close.bind(this)}>
                <i className="fa fa-close"/>
              </button>
            </div>

            <div className="uir-modal-body" style={{"maxHeight": "80%"}}>
              <pre style={{"maxHeight": "80%"}}>{ this.props.value }</pre>
            </div>

            <div className="uir-modal-footer">
              <button className="btn btn-primary" onClick={this.close.bind(this)}>Close</button>
            </div>
          </Modal>
        </div>
    )
  }
}
var foo = `




`