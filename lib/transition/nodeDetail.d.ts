import { Component } from "preact";
export interface IProps {
    node: any;
    type: string;
}
export interface IState {
}
export declare class NodeDetail extends Component<IProps, IState> {
    stateName(): any;
    params(): any;
    resolves(): any;
    render(): JSX.Element;
}
