export let moduleName = "ui.router.visualizer";

import angular = require("angular");
import 'ngreact';

export let ng = angular || (<any> window).angular;
export let app = ng.module(moduleName, ['ui.router', 'react']);

import "./d3ng";
import "./easing";
import "./service"
