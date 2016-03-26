/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='../typings/d3/d3.d.ts' />

export let moduleName = "ui.router.visualizer";

import angular = require("angular");

export let ng = angular || (<any> window).angular;
export let app = ng.module(moduleName, ['ui.router']);


import "./d3ng";
import "./easing";
import "./service"
