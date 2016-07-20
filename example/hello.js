var myApp = angular.module('hello', ['ui.router']);

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
          }, 500);
        }
      }
    }
  ];
  
  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });
});


myApp.run(function($http, $rootScope, ng1UIRouter) {
  var visualizer = window['ui-router-visualizer'];
  var StateVisualizer = visualizer.StateVisualizer;
  var TransitionVisualizer = visualizer.TransitionVisualizer;

  StateVisualizer.create(ng1UIRouter);
  TransitionVisualizer.create(ng1UIRouter);

  $http.get('data/people.json', { cache: true });
});