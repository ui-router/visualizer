import * as React from "react";
export interface IProps {
    transition: any;
    toggleExpand: Function;
    status: string;
    message: string;
}
export interface IState {
}
export declare class BreadcrumbArrow extends React.Component<IProps, IState> {
    handleClick: () => any;
    iconClass(): any;
    render(): JSX.Element;
}
