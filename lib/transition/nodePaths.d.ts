import { Component } from "preact";
export interface TransStruct {
    key: string;
    to: any;
    toType: string;
    from: any;
    fromType: string;
}
export interface IProps {
    transition: any;
}
export interface IState {
    retained: TransStruct[];
    enterExit: TransStruct[];
}
export declare class NodePaths extends Component<IProps, IState> {
    state: {
        retained: any[];
        enterExit: any[];
    };
    componentDidMount(): void;
    render(): JSX.Element;
}
