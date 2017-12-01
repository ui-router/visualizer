import { h, Component } from 'preact';
import { StateSelector } from '../selector/StateSelector';
import { RENDERER_PRESETS, DEFAULT_RENDERER } from './renderers';
import { LayoutPrefs } from './LayoutPrefs';
import { Renderer } from './interface';
import { UIRouter } from '@uirouter/core';

import { ChevronDown } from './icons/ChevronDown';
import { Close} from './icons/Close';
import { Gear } from './icons/Gear';
import { Help } from './icons/Help';

export interface IControlsProps {
    router: UIRouter;
    onRendererChange: (renderer: Renderer) => void;
    onMinimize: () => void;
    onClose: () => void;
}

export interface IControlsState { 
    showRendererPrefs: boolean;
}

declare function require(string): string;
const imgChevron = require('../../images/16/chevron-down.png');

export class Controls extends Component<IControlsProps, IControlsState> {
    state = {
        showRendererPrefs: false,
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
            <div className="uirStateVisControls">
                <StateSelector router={this.props.router} />
                <div style={{ marginLeft: 'auto', cursor: 'pointer' }} className="uirStateVisIcons">
                    <span className="uirStateVisHover">
                        <Help/>
                        <div className="hoverBlock">
                            <ul>
                                <li>Click a node to activate that state.</li>
                                <li>Select a state from the dropdown to activate that state.</li>
                                <li>Double click a node to auto-collapse that section of the tree when inactive.
                                    Collapsed nodes are displayed with a dotted outline and the count of collapsed children.</li>
                                <li>Lazy loaded states (including future states) are displayed with a dashed outline.</li>
                            </ul>
                        </div>
                    </span>

                    <span className="uirStateVisHover">
                        <Gear/>
                        <div className="hoverBlock"><LayoutPrefs onRendererChange={this.props.onRendererChange}/></div>
                    </span>

                    <span className="uirStateVisHover" onClick={this.props.onMinimize}>
                        <ChevronDown/>
                        <div><span style={{float: 'right'}}>Minimize</span></div>
                        <div>Minimize</div>
                    </span>
                    
                    <span className="uirStateVisHover" onClick={this.props.onClose}>
                        <Close/>
                        <div><span style={{float: 'right'}}>Close</span></div>
                    </span>
                </div>

            </div>
            </div>
        )
    }
}