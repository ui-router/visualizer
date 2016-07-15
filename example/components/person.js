angular.module('hello').component('person', {
  bindings: { person: '<' },
  template: '<h3>A person!</h3>' +
  
            '<div>Name: {{$ctrl.person.name}}</div>' +
            '<div>Id: {{$ctrl.person.id}}</div>' +
            '<div>Company: {{$ctrl.person.company}}</div>' +
            '<div>Email: {{$ctrl.person.email}}</div>' +
            '<div>Address: {{$ctrl.person.address}}</div>' +
            
            '<button ui-sref="people">Close</button>'
});