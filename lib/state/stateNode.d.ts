import { Component } from "preact";
import { Renderer } from "./interface";
import { StateVisNode } from "./stateVisNode";
export interface IProps {
    router: any;
    node: StateVisNode;
    renderer: Renderer;
    doLayout: Function;
    x: number;
    y: number;
}
export interface IState {
}
export declare class StateNode extends Component<IProps, IState> {
    goTimeout: any;
    handleCollapseClicked: (event: any) => void;
    handleGoClicked: (event: any) => void;
    render(): JSX.Element;
}
