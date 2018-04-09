import { h, Component } from 'preact';
import { StateSelector } from '../selector/StateSelector';
import { RENDERER_PRESETS, DEFAULT_RENDERER } from './renderers';
import { Renderer } from './interface';
import { UIRouter } from '@uirouter/core';

export interface ILayoutPrefsProps {
  onRendererChange: (renderer: Renderer) => void;
}

export interface ILayoutPrefsState {
  renderer: Renderer;
  presetName: string;
}

export class LayoutPrefs extends Component<ILayoutPrefsProps, ILayoutPrefsState> {
  state = {
    renderer: DEFAULT_RENDERER,
    presetName: 'Tree',
  };

  componentDidMount() {
    this.props.onRendererChange(this.state.renderer);
  }

  handleZoom(event: Event) {
    let el = event.target;
    let value = parseFloat(el['value']);
    let renderer = { ...this.state.renderer, zoom: value };
    this.setState({ renderer });
    this.props.onRendererChange(renderer);
  }

  handleLayout(event: Event) {
    let presetName = event.target['value'];
    let settings = RENDERER_PRESETS[presetName];
    let renderer = { ...this.state.renderer, ...settings };
    this.setState({ renderer, presetName });
    this.props.onRendererChange(renderer);
  }

  render() {
    return (
      <div
        className="uirStateVisLayoutPrefs"
        style={{ display: 'flex', flexFlow: 'column nowrap' }}
        onMouseDown={evt => evt.stopPropagation()}
      >
        <div style={{ flex: '1 1 auto', display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
          <div>Layout:</div>
          <select
            style={{ marginLeft: 'auto', maxWidth: '100px' }}
            onChange={this.handleLayout.bind(this)}
            value={this.state.presetName}
          >
            {Object.keys(RENDERER_PRESETS).map(preset => <option value={preset}>{preset}</option>)}
          </select>
        </div>

        <div style={{ flex: '1 1 auto', display: 'flex', flexFlow: 'row nowrap', alignItems: 'center' }}>
          <span>Node size:</span>
          <input
            style={{ marginLeft: 'auto' }}
            value={'' + this.state.renderer.zoom}
            type="range"
            min="0.3"
            max="3.0"
            step="0.1"
            onInput={this.handleZoom.bind(this)}
          />
          <span>{this.state.renderer.zoom}x</span>
        </div>
      </div>
    );
  }
}
