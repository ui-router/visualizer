import * as React from "react";

export interface IProps {
  data: any
}
export interface IState {
  show: boolean;
}

export class Pretty extends React.Component<IProps, IState> {
  style = {
    backgroundColor: '#1f4662',
    color: '#fff',
    fontSize: '12px',
  };

  headerStyle = {
    backgroundColor: '#193549',
    padding: '5px 10px',
    fontFamily: 'monospace',
    color: '#ffc600',
  };

  preStyle = {
    display: 'block',
    padding: '10px 30px',
    margin: '0',
    overflow: 'scroll',
  };

  getInitialState() {
    return {
      show: true,
    };
  }

  toggle() {
    this.setState({
      show: !this.state.show,
    });
  }

  render() {
    return (
        <div style={this.style}>
          <div style={this.headerStyle} onClick={ this.toggle }>
            <strong>Pretty Debug</strong>
          </div>
          {( this.state.show ?
              <pre style={this.preStyle}>
                        {JSON.stringify(this.props.data, null, 2) }
                    </pre> : false )}
        </div>
    );
  }
}