import { Component } from "preact";
export interface IProps {
    transition: any;
}
export interface IState {
    status?: string;
    message?: string;
    rejection?: string;
    pinned?: boolean;
    expanded?: boolean;
    open?: boolean;
    deregisterFunctions?: Function[];
}
export declare class TransitionView extends Component<IProps, IState> {
    transitionPromise: any;
    state: {
        status: string;
        message: any;
        rejection: any;
        pinned: boolean;
        expanded: boolean;
        open: boolean;
        deregisterFunctions: any[];
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    togglePin: () => void;
    toggleExpand: () => void;
    open: () => void;
    close: () => void;
    render(): JSX.Element;
}
