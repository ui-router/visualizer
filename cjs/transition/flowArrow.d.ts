import * as React from "react";
export interface IProps {
    top: string;
    bottom: string;
}
export declare class FlowArrow extends React.Component<IProps, any> {
    height: number;
    renderCurve: () => JSX.Element;
    renderVerticalLine: () => JSX.Element;
    renderCurveRU: () => JSX.Element;
    renderCurveRD: () => JSX.Element;
    renderArrowU: () => JSX.Element;
    renderArrowD: () => JSX.Element;
    render(): JSX.Element;
}
