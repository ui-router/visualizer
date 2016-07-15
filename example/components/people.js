angular.module('hello').component('people', {
  bindings: { people: '<' },
  
  template: '<div class="flex-h">' + 
            '  <div class="people">' +
            '    <h3>Some people:</h3>' +
            '    <ul>' +
            '      <li ng-repeat="person in $ctrl.people">' +
            '        <a ui-sref-active="active" ui-sref="people.person({ personId: person.id })">' +
            '          {{person.name}}' +
            '        </a>' +
            '      </li>' +
            '    </ul>' + 
            '  </div>' +
            '  <ui-view></ui-view>' +
            '</div>'
});