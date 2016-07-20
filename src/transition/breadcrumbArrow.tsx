import * as React from "react";

export interface IProps {
  transition: any;
  toggleExpand: Function;
  status: string;
  message: string;
}

export interface IState {
}

export class BreadcrumbArrow extends React.Component<IProps, IState> {
  handleClick() {
    this.props.toggleExpand();
  }

  iconClass() {
    let iconClasses = {
      running: 'fa fa-spin fa-spinner',
      success: 'fa fa-check',
      redirected: 'fa fa-share',
      ignored: 'fa fa-circle-o',
      error: 'fa fa-close'
    };

    return iconClasses[this.props.status];
  }

  render() {
    return !this.props.transition ? null : (
        <div className={this.props.status + " historyEntry"} onClick={this.handleClick.bind(this)}>
          <div className="summary">
            <div className="transid">{this.props.transition.$id}</div>
            <div className="status">
              {this.props.status}
              {!this.props.message ? null : <span>: {this.props.message}</span>}
            </div>
            <div className="transname">
              <i className={this.iconClass()} /> {this.props.transition.to().name}
            </div>
          </div>
        </div>
    )
  }

}
