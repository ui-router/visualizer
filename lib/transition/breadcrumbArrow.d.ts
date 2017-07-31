import { Component } from "preact";
export interface IProps {
    transition: any;
    toggleExpand: Function;
    status: string;
    message: string;
}
export interface IState {
}
export declare class BreadcrumbArrow extends Component<IProps, IState> {
    handleClick: () => any;
    iconClass(): any;
    render(): JSX.Element;
}
