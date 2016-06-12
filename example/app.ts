import { ng, app } from '../src/statevis.module.ts';
import 'angular-ui-router';

import Home from './components/home';
import Foo from './components/foo';
import Bar from './components/bar';

ng
    .module('vis', ['ui.router', 'ui.router.visualizer'])
    .config(($stateProvider) => {
        console.log('config');
        $stateProvider.state({
            name: 'home',
            url: '/home',
            component: 'home'
        });

        $stateProvider.state({
            name: 'home.foo',
            url: '/foo',
            resolve: {
                fooData: function () {
                    return ['foo', 'FOO', 'Fu'];
                }
            },
            component: 'foo'
        });

        $stateProvider.state({
            name: 'home.bar',
            url: '/bar',
            resolve: {
                barData: function () {
                    return ['bar', 'snickers', 'cheers'];
                }
            },
            component: 'bar'
        });
    })
    
    .component('home', Home)
    .component('foo', Foo)
    .component('bar', Bar);