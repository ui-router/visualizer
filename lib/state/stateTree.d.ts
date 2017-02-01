import { Component } from "preact";
import { NodeDimensions, VisDimensions, Renderer } from "./interface";
import { StateVisNode } from "./stateVisNode";
export interface IProps extends NodeDimensions, VisDimensions {
    router?: any;
    renderer?: Renderer;
}
export interface IState {
    nodes?: StateVisNode[];
}
export declare class StateTree extends Component<IProps, IState> {
    static create(router: any, element?: any, props?: {}): any;
    state: {
        nodes: any[];
        layout: any;
    };
    nodes: StateVisNode[];
    unmounted: boolean;
    deregisterHookFn: Function;
    deregisterStateListenerFn: Function;
    componentDidMount(): void;
    componentWillReceiveProps(): void;
    dimensions(): {
        radius: number;
        offsetX: number;
        offsetY: number;
        scaleX: any;
        scaleY: any;
    };
    componentWillUnmount(): void;
    cancelCurrentAnimation: () => any;
    doLayoutAnimation: () => void;
    nodeForState: (nodes: any, state: any) => any;
    updateStates: () => void;
    updateNodes: ($transition$?: any) => void;
    getNodes(): StateVisNode[];
    render(): JSX.Element;
}
