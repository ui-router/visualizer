var myApp = angular.module('hello', ['ui.router', 'ui.router.visualizer']);

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
  ]
  
  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });
});


myApp.run(function($http, $rootScope, $transitions) {
  $rootScope.$transitions = $transitions;
  $http.get('data/people.json', { cache: true });
});