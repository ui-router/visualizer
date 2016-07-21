import * as React from "react";
import * as ReactDOM from "react-dom";

export interface IProps { }
export interface IState { }
export class Modal extends React.Component<IProps, IState> {

  static show = (labels, key, value, component) => {
    let modal = document.body.querySelector("#uir-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "uir-modal";
      document.body.appendChild(modal);
    }
    const close = () => ReactDOM.unmountComponentAtNode(modal);
    ReactDOM.render(React.createElement(component, {close, labels, key, value}), modal);
  };

  componentDidMount() {
    let el = ReactDOM.findDOMNode(this.refs['modal']);
    setTimeout(() => {
      let fades = el.getElementsByClassName("uir-fade");
      [].slice.apply(fades).forEach(node => node.className += " in");
    }, 35)
  }

  render() {
    return (
        <div ref="modal">
          <div className="uir-modal-backdrop uir-fade" style={{zIndex: 1040}}></div>

          <div tabIndex="-1" className="uir-modal uir-fade" style={{zIndex: 1050, display: "block"}}>
            <div className="uir-modal-dialog modal-lg">
              <div className="uir-modal-content">
                { this.props.children }
              </div>
            </div>
          </div>
        </div>
    )
  }
}
