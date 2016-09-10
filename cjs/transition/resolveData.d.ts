import * as React from "react";
export interface IProps {
    toggles?: any;
    labels?: any;
    open?: boolean;
    close?: Function;
    id?: string;
    value?: any;
}
export declare class ResolveData extends React.Component<IProps, any> {
    close: () => any;
    render(): JSX.Element;
}
