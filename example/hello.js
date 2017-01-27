var myApp = angular.module('hello', ['ui.router', 'oc.lazyLoad']);

myApp.config(function($stateProvider) {
  // An array of state definitions
  var states = [
    { name: 'hello', url: '/hello', component: 'hello' },
    { name: 'about', url: '/about', component: 'about' },
    
    { 
      name: 'people', 
      url: '/people', 
      component: 'people',
      resolve: {
        people: function(PeopleService) {
          return PeopleService.getAllPeople();
        }
      }
    },
    
    { 
      name: 'people.person', 
      url: '/{personId}', 
      component: 'person',
      resolve: {
        person: function(people, $stateParams, $timeout) {
          return $timeout(function() {
            return people.find(function(person) {
              return person.id === $stateParams.personId;
            });
          }, 2500); // long delay
        }
      }
    },

    {
      name: 'about.lazy',
      url: '/lazy',
      lazyLoad: function (trans) {
          return trans.injector().get('$ocLazyLoad').load('./lazy/index.js');
      }
    }
  ];
  
  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });
});


myApp.run(function($http, $rootScope, $uiRouter) {
  var vis = window['ui-router-visualizer'];
  vis.visualizer($uiRouter);

  $http.get('data/people.json', { cache: true });

  var registry = $uiRouter.stateRegistry;
  $rootScope.addstate = function() {
    var states = registry.get();
    var idx = Math.floor(Math.random() * states.length);
    var parent = states[idx];

    var newname = VISWORDS[Math.floor(Math.random() * VISWORDS.length)];
    var newState = {
      name: (parent.name ? parent.name + "." : "") + newname,
    };

    registry.register(newState);
  }
});
