angular.module('hello').service('PeopleService', function($http, $timeout) {
  var service = {
    getAllPeople: function() {
      return $timeout(function() {
        return $http.get('data/people.json', { cache: true }).then(function(resp) {
          return resp.data;
      })}
      , 1000);
    },

    getPerson: function(id) {
      function personMatchesParam(person) {
        return person.id === id;
      }

      return $timeout(function () {
        service.getAllPeople().then(function (people) {
          return people.find(personMatchesParam)
        });
      }, 1300);
    }
  }

  return service;
})