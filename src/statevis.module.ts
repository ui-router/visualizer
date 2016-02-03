/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='../typings/angular-ui-router/angular-ui-router.d.ts' />
/// <reference path='../typings/d3/d3.d.ts' />

import d3ng from "./d3ng";
import easing from "./easing";
import visSvc from "./service"

let moduleName = "ui.router.statevis";
export let app = angular.module(moduleName, ['ui.router', visSvc, d3ng, easing]);
export default moduleName;
