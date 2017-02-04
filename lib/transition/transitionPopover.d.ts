import { Component } from "preact";
export interface IProps {
    transition: any;
    status: string;
    rejection: string;
    pinned: boolean;
    expanded: boolean;
    open: boolean;
    togglePinned: Function;
    toggleExpand: Function;
}
export interface IState {
}
export declare class TransitionPopover extends Component<IProps, IState> {
    render(): JSX.Element;
}
