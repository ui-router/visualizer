import { Component } from "preact";
export interface IProps {
    data: any;
}
export interface IState {
    show: boolean;
}
export declare class Pretty extends Component<IProps, IState> {
    preStyle: {
        display: string;
        padding: string;
        margin: string;
    };
    state: {
        show: boolean;
    };
    toggle(): void;
    render(): JSX.Element;
}
