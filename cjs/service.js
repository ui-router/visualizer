/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/d3/d3.d.ts" />
"use strict";
var statevis_module_1 = require("./statevis.module");
/**
 * This service watches for state lifecycle (added/removed).  It maintains an array of states (wrapped as nodes).
 * When transitions occur, it applies transition metadata to the nodes.
 */
statevis_module_1.app.service("uirStateVisService", function ($state, $interval) {
    var nodes = [];
    var nodeForState = function (state) { return nodes.filter(function (node) { return node.name === state.name; })[0]; };
    var pollStates = function () {
        var all = $state.get().map(function (s) { return s.$$state(); });
        var known = nodes.map(Object.getPrototypeOf);
        var toAdd = all.filter(function (s) { return known.indexOf(s) === -1; });
        var toDel = known.filter(function (s) { return all.indexOf(s) === -1; });
        if (toAdd.length || toDel.length) {
            toAdd.map(function (s) { return Object.create(s); }).forEach(function (n) { return nodes.push(n); });
            // todo: del.forEach(blah)
            // Rebuild each node's children array
            nodes.forEach(function (n) { return n.children = []; });
            nodes.forEach(function (n) {
                if (!n || !n.parent)
                    return;
                var parentNode = nodeForState(n.parent);
                if (!parentNode)
                    return;
                parentNode.children.push(n);
                n._parent = parentNode;
            });
        }
    };
    pollStates();
    var cancel = $interval(pollStates, 1000);
    return {
        nodeForState: nodeForState,
        nodes: nodes,
        cancel: cancel
    };
});
statevis_module_1.app.run(function ($rootScope, $injector, uirStateVisService) {
    var nodes = uirStateVisService.nodes;
    var nodeForState = uirStateVisService.nodeForState;
    var $transitions = $injector.get("$transitions");
    var resetMetadata = {
        label: '',
        highlight: false,
        active: false,
        retained: false,
        entered: false,
        exited: false,
        inactive: true
    };
    var applyClasses = function (node) {
        var classes = ["entered", "retained", "exited", "active", "inactive", "highlight"];
        node._classes = classes.reduce(function (str, clazz) { return (str + (node[clazz] ? " " + clazz + " " : '')); }, '');
    };
    if ($transitions) {
        $transitions.onSuccess({}, function ($transition$) {
            var tc = $transition$.treeChanges();
            var getNode = function (node) { return nodeForState(node.state); };
            nodes.forEach(function (n) { return angular.extend(n, resetMetadata); });
            tc.retained.concat(tc.entering).map(getNode).forEach(function (n) { return n.entered = true; });
            tc.retained.map(getNode).forEach(function (n) { return n.retained = true; });
            tc.exiting.map(getNode).forEach(function (n) { return n.exited = true; });
            tc.to.slice(-1).map(getNode).forEach(function (n) { n.active = true; n.label = "active"; });
            nodes.forEach(applyClasses);
        });
    }
    else {
        $rootScope.$on("$stateChangeSuccess", function (evt, toState, toParams) {
            nodes.forEach(function (n) { return angular.extend(n, resetMetadata); });
            nodeForState(toState).active = true;
        });
    }
});
//# sourceMappingURL=service.js.map