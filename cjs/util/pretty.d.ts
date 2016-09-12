import * as React from "react";
export interface IProps {
    data: any;
}
export interface IState {
    show: boolean;
}
export declare class Pretty extends React.Component<IProps, IState> {
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
