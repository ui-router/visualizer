import { h, Component } from 'preact';
import { StateSelector } from '../selector/StateSelector';
import { RENDERER_PRESETS, DEFAULT_RENDERER } from './renderers';
import { Renderer } from './interface';
import { UIRouter } from '@uirouter/core';

export interface IControlsProps {
    router: UIRouter;
    onRendererChange: (renderer: Renderer) => void;
    onMinimize: () => void;
}

export interface IControlsState {
  renderer: Renderer;
  presetName: string;
}

declare function require(string): string;
const imgChevron = require('../../images/16/chevron-down.png');

export class Controls extends Component<IControlsProps, IControlsState> {
    state = {
        renderer: DEFAULT_RENDERER,
        presetName: 'Tree',
    }

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
        const zoomLevels = [2.0, 1.5, 1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3];
        
        return (
            <div className="uirStateVisControls">
                <div>Current State: <StateSelector router={this.props.router} /></div>
                <div>
                    <select onChange={this.handleLayout.bind(this)} value={this.state.presetName} style={{ maxWidth: 100 }}>
                        {Object.keys(RENDERER_PRESETS).map(preset =>
                            <option value={preset}>{preset}</option>
                        )}
                    </select>

                    <select onChange={this.handleZoom.bind(this)} value={this.state.renderer.zoom + ''} style={{ maxWidth: 100 }}>
                        {zoomLevels.map(level =>
                            <option value={level + ""}>{level}x</option>
                        )}
                    </select>

                </div>

                <button onClick={this.props.onMinimize}>
                    <img src={imgChevron} style={{ cursor: 'pointer' }} />
                </button>
            </div>
        )
    }
}