import { h, render, Component } from "preact";

export interface IProps { }
export interface IState { }
export class Modal extends Component<IProps, IState> {
  _ref: any;

  static show = (labels, key, value, component) => {
    let modal = document.body.querySelector("#uirTranVis_modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "uirTranVis_modal";
      document.body.appendChild(modal);
    }

    const Nothing = () => null;
    const close = () => render(<Nothing />, document.body, modal);
    render(h(component, {close, labels, key, value}), modal);
  };

  componentDidMount() {
    let el = this._ref;
    setTimeout(() => {
      let fades = el.getElementsByClassName("uir-fade");
      [].slice.apply(fades).forEach(node => node.className += " in");
    }, 35)
  }

  render() {
    return (
      <div ref={ ref => this._ref = ref }>
        <div className="uirTranVis_modal-backdrop uir-fade" style={{zIndex: 1040}}></div>

        <div tabIndex={-1} className="uirTranVis_modal uir-fade" style={{zIndex: 1050, display: "block"}}>
          <div className="uirTranVis_modal-dialog modal-lg">
            <div className="uirTranVis_modal-content">
              { this.props.children }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
