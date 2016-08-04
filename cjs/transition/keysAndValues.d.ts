import * as React from "react";
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
export declare class KeysAndValues extends React.Component<IProps, IState> {
    isEmpty: () => boolean;
    class: (name: any) => any;
    render(): JSX.Element;
}
