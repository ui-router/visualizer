import { Component } from "preact";
export interface IProps {
    transition: any;
    pinned: boolean;
    expanded: boolean;
    togglePinned: any;
    toggleExpand: any;
}
export interface IState {
}
export declare class PopoverHeading extends Component<IProps, IState> {
    render(): JSX.Element;
}
