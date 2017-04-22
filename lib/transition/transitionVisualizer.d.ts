import { Component } from "preact";
import "./transitionVisualizer.css";
export interface IProps {
    router: any;
    maximumTransitions?: number;
}
export interface IState {
    transitions?: any[];
    pointerEvents?: string;
}
/**
 * This outer component manages the list of all transitions (history), and provides a fixed, scrolling viewport.
 * It attaches hooks for lifecycle events and decorates the transition with a descriptive message.
 */
export declare class TransitionVisualizer extends Component<IProps, IState> {
    /**
     * Creates a new TransitionVisualizer and adds it to the document.
     *
     * @param router the UIRouter object
     * @param element (optional) the element where the TransitionVisualizer should be placed.
     *                If no element is passed, an element will be created in the body.
     * @param props maximum transitions default: { maximumTransitions: 15 }
     *
     *
     * # Angular 1 + UI-Router (1.0.0-beta.2 and higher):
     *
     * Inject the router (`$uiRouter`) in a run block, then call TransitionVisualizer.create();
     *
     * ```
     * app.run(function($uiRouter) {
     *   TransitionVisualizer.create($uiRouter);
     * });
     * ```
     *
     * # Angular 1 + UI-Router 1.0.0-alpha.1 through 1.0.0-beta.1:
     *
     * Inject the router (`ng1UIRouter`) in a run block, then call TransitionVisualizer.create();
     *
     * ```
     * app.run(function(ng1UIRouter) {
     *   TransitionVisualizer.create(ng1UIRouter);
     * });
     * ```
     *
     * Angular 2:
     *
     * Call TransitionVisualizer.create() from your UIRouterConfig
     *
     * ```
     * export class MyUIRouterConfig extends UIRouterConfig {
     *   configure(router: UIRouter) {
     *     TransitionVisualizer.create(router);
     *   }
     * }
     * ```
     *
     * React:
     *
     * Call TransitionVisualizer.create() from your bootstrap
     *
     * ```
     * let router = new UIRouterReact();
     * TransitionVisualizer.create(router);
     * router.start();
     * ```
     *
     * @return the element that was bootstrapped.
     *         You can destroy the component using:
     *         [ReactDOM.unmountComponentAtNode](https://facebook.github.io/react/docs/top-level-api.html#reactdom.unmountcomponentatnode)
     */
    static create(router: any, element?: any, props?: {}): any;
    deregisterFns: any[];
    state: {
        transitions: any[];
        pointerEvents: string;
    };
    static defaultProps: {
        router: any;
        maximumTransitions: number;
    };
    _div: any;
    cancelPreviousAnim: any;
    componentDidMount(): void;
    /**
     * Disable pointer events when the mouse is above the timeline
     *
     * This allows clicks to pass through the outer div to the user's app components
     * even when a transitionview details box is open and pinned.
     *
     * Enable pointer events when mouse is inside the timeline to allow horizontal scroll & scroll wheel
     */
    onMouseMove: (evt: any) => void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
