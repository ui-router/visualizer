import * as React from "react";
import { NodeDimensions, VisDimensions, StateVisNode } from "./interface";
export interface IProps extends NodeDimensions, VisDimensions {
    router: any;
}
export interface IState {
    nodes?: StateVisNode[];
    layout?: {
        [key: string]: {
            x: number;
            y: number;
        };
    };
}
export declare class StateTree extends React.Component<IProps, IState> {
    static create(router: any, element?: any, props?: {}): any;
    state: {
        nodes: any[];
        layout: any;
    };
    tree: any;
    unmounted: boolean;
    deregisterFn: Function;
    componentDidMount(): void;
    dimensions(): {
        radius: number;
        offsetX: number;
        offsetY: number;
        scaleX: any;
        scaleY: any;
    };
    componentWillUnmount(): void;
    makeLinkPath: (node: any) => string;
    getCurrentCoords: (node: any) => any;
    cancelCurrentAnimation: () => any;
    doLayoutAnimation: () => void;
    nodeForState: (nodes: any, state: any) => any;
    updateStates: () => void;
    render(): JSX.Element;
}
