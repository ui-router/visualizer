import * as React from "react";
export interface IProps {
}
export interface IState {
}
export declare class Modal extends React.Component<IProps, IState> {
    static show: (labels: any, key: any, value: any, component: any) => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
