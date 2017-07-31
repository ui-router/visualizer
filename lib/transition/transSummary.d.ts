import { Component } from "preact";
export interface IProps {
    trans: any;
    status: string;
    rejection: string;
}
export interface IState {
}
export declare class TransSummary extends Component<IProps, IState> {
    render(): JSX.Element;
}
