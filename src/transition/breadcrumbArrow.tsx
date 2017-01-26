import { h, render, Component } from "preact";

export interface IProps {
  transition: any;
  toggleExpand: Function;
  status: string;
  message: string;
}

export interface IState {
}

export class BreadcrumbArrow extends Component<IProps, IState> {
  handleClick = () =>
      this.props.toggleExpand();

  iconClass() {
    let iconClasses = {
      running: 'uir-icon uir-spin uir-iconw-spinner',
      success: 'uir-icon uir-iconw-check',
      redirected: 'uir-icon uir-iconw-share',
      ignored: 'uir-icon uir-iconw-circle-o',
      error: 'uir-icon uir-iconw-close'
    };

    return iconClasses[this.props.status];
  }

  render() {
    return !this.props.transition ? null : (
        <div className={this.props.status + " historyEntry"} onClick={this.handleClick}>
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
