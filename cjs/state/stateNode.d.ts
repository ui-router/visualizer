import * as React from "react";
import { StateVisNode } from "./interface";
export interface IProps {
    router: any;
    node: StateVisNode;
    radius: number;
    x: number;
    y: number;
}
export interface IState {
}
export declare class StateNode extends React.Component<IProps, IState> {
    selectState: () => void;
    render(): JSX.Element;
}
