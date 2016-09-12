import * as React from "react";
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
export declare class TransitionPopover extends React.Component<IProps, IState> {
    render(): JSX.Element;
}
