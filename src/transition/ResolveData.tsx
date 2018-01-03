import { h, render, Component } from "preact";
import {Modal} from "../util/modal";
import {Pretty} from "../util/pretty";

export interface IProps {
  toggles?: any;
  open?: boolean;
  close?: Function;
  modalTitle?: string;
  id?: string;
  value?: any;
}

export class ResolveData extends Component<IProps,any> {
  close = () => this.props.close();

  render() {
    return (
        <div>
          <Modal>
            <div className="uirTranVis_modal-header uir-resolve-header">
              <div style={{"fontSize": "20px"}}>{this.props.modalTitle}: {this.props.id}</div>
              <button className="uirTranVis_btn uirTranVis_btnXs uirTranVis_btnPrimary" onClick={this.close}>
                <i className="uir-icon uir-iconw-close"/>
              </button>
            </div>

            <div className="uirTranVis_modalBody">
              <Pretty data={this.props.value} />
            </div>

            <div className="uirTranVis_modalFooter">
              <button className="uirTranVis_btn uirTranVis_btnPrimary" onClick={this.close}>Close</button>
            </div>
          </Modal>
        </div>
    )
  }
}
