var app = angular.module('lazy', ['ui.router']);

app.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('about.lazy', {
    url: '/lazy',
    component: 'lazyComponent'
  });

  $stateProvider.state('about.lazy.nest1', {
    url: '/nested1',
    component: 'lazyNestComponent1'
  });
  $stateProvider.state('about.lazy.nest2', {
    url: '/nested2',
    component: 'lazyNestComponent2'
  });
}]);

app.component('lazyComponent', {
  template: '<h1>Lazy state and lazy component</h1><a ui-sref=".nest1">Nested 1</a><a ui-sref=".nest2">Nested 2</a> <div ui-view></div>'
});

app.component('lazyNestComponent1', {
  template: '<h1>A nested lazy state and lazy component</h1>'
});

app.component('lazyNestComponent2', {
  template: '<h1>Another nested lazy state and lazy component</h1>'
});
