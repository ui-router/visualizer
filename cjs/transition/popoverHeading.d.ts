import * as React from "react";
export interface IProps {
    transition: any;
    pinned: boolean;
    expanded: boolean;
    togglePinned: Function;
    toggleExpand: Function;
}
export interface IState {
}
export declare class PopoverHeading extends React.Component<IProps, IState> {
    render(): JSX.Element;
}
