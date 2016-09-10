import * as React from "react";
import "./stateVisualizer.css";
export interface IProps {
    router: any;
    minimizeAfter?: number;
    width?: number;
    height?: number;
}
export interface IState {
}
export declare class StateVisualizer extends React.Component<IProps, IState> {
    /**
     * Creates a new StateVisualizer and adds it to the document.
     *
     * @param router the UIRouter object
     * @param element (optional) the element where the StateVisualizer should be placed.
     *                If no element is passed, an element will be created in the body.
     * @param props height/width properties default: { height: 350, width: 250 }
     *
     * # Angular 1 + UI-Router (1.0.0-beta.2 and higher):
     *
     * Inject the router (`$uiRouter`) in a run block, then call StateVisualizer.create();
     *
     * ```
     * app.run(function($uiRouter) {
     *   StateVisualizer.create($uiRouter);
     * });
     * ```
     *
     * # Angular 1 + UI-Router 1.0.0-alpha.1 through 1.0.0-beta.1:
     *
     * Inject the router (`ng1UIRouter`) in a run block, then call StateVisualizer.create();
     *
     * ```
     * app.run(function(ng1UIRouter) {
     *   StateVisualizer.create(ng1UIRouter);
     * });
     * ```
     *
     * Angular 2:
     *
     * Call StateVisualizer.create() from your UIRouterConfig
     *
     * ```
     * export class MyUIRouterConfig extends UIRouterConfig {
     *   configure(router: UIRouter) {
     *     StateVisualizer.create(router);
     *   }
     * }
     * ```
     *
     * React:
     *
     * Call StateVisualizer.create() from your bootstrap
     *
     * ```
     * let router = new UIRouterReact();
     * StateVisualizer.create(router);
     * router.start();
     * ```
     *
     * @return the element that was bootstrapped.
     *         You can destroy the component using:
     *         [ReactDOM.unmountComponentAtNode](https://facebook.github.io/react/docs/top-level-api.html#reactdom.unmountcomponentatnode)
     */
    static create(router: any, element?: any, props?: {}): any;
    private el;
    right: string;
    bottom: string;
    minimize: (evt?: any) => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
