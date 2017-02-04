import { Component } from "preact";
export interface IProps {
    router: any;
}
export interface IState {
    current?: string;
    states?: string[];
    deregisterFn?: Function;
}
export declare class StateSelector extends Component<IProps, IState> {
    deregisterStateListenerFn: Function;
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
