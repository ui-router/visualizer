angular.module('hello').component('about', {
  template:  '<h3>Its the UI-Router "Hello Galaxy" app!</h3> ' +
             '<a ui-sref=".lazy">lazy state</a> ' +
             '<div ui-view></div>'
});