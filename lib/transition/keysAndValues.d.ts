import { Component } from "preact";
export interface IProps {
    data: any;
    labels: {
        section?: string;
        modalTitle?: string;
    };
    classes: {
        outerdiv?: string;
        section?: string;
        keyvaldiv?: string;
        _key?: string;
        value?: string;
    };
}
export interface IState {
}
export declare class KeysAndValues extends Component<IProps, IState> {
    isEmpty: () => boolean;
    class: (name: any) => any;
    render(): JSX.Element;
}
