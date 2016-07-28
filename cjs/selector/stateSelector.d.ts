import * as React from "react";
export interface IProps {
    router: any;
}
export interface IState {
    current?: string;
    states?: string[];
    deregisterFn?: Function;
}
export declare class StateSelector extends React.Component<IProps, IState> {
    state: {
        current: any;
        states: any[];
        deregisterFn: any;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    selectState: (event: any) => void;
    render(): JSX.Element;
}
