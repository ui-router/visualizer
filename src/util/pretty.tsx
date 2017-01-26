import { h, render, Component } from "preact";

export interface IProps {
  data: any
}
export interface IState {
  show: boolean;
}

export class Pretty extends Component<IProps, IState> {
  preStyle = {
    display: 'block',
    padding: '10px 30px',
    margin: '0',
  };

  state = {show: true};

  toggle() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
        <div>
          {( this.state.show ?
              <pre style={this.preStyle}>
                        {JSON.stringify(this.props.data, null, 2) }
                    </pre> : false )}
        </div>
    );
  }
}