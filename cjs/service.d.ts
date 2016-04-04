/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />
export interface INode {
    label: string;
    highlight: boolean;
    active: boolean;
    retained: boolean;
    exited: boolean;
    entered: boolean;
    inactive: boolean;
}
