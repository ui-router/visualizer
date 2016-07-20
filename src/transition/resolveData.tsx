import * as React from "react";
import {Modal} from "../util/modal";
import {Pretty} from "../util/pretty";

export interface IProps {
  toggles?: any;
  labels?: any;
  open?: boolean;
  close?: Function;
  id?: string;
  value?: any;
}

export class ResolveData extends React.Component<IProps,any> {
  render() {
    return (
        <div>
          <Modal>
            <div className="uir-modal-header uir-resolve-header">
              <div style={{"fontSize": "1.5em"}}>{this.props.labels.modalTitle}: {this.props.id}</div>
              <button className="btn btn-primary" onClick={this.props.close.bind(this.props.close)}>
                <i className="fa fa-close"/>
              </button>
            </div>

            <div className="uir-modal-body">
              <Pretty data={this.props.value} />
            </div>

            <div className="uir-modal-footer">
              <button className="btn btn-primary" onClick={this.props.close.bind(this.props.close)}>Close</button>
            </div>
          </Modal>
        </div>
    )
  }
}
