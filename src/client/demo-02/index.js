//console.log('loading landing app main js...');

import 'angular';
import 'angular-ui-router';

const appModule = angular.module('app_module', []);

appModule.controller('AppController', ['$scope', function ($scope) {
  this.title = 'Demo 02';

  $scope.$watch(() => console.count('$digest'));
}]);

appModule.component('layout', {
  templateUrl: 'client/demo-02/layout.html'
});

appModule.controller('HelloController', [function () {
  this.names = [];

  this.addName = function () {
    this.names.push(this.name);
    this.name = '';
    console.log('added a name:', this);
  };
}]);

// angular manual initialisation since we use a script loader
console.log('* Bootstrapping angular...');
angular.element(document).ready(function() {
  angular.bootstrap(document, ['app_module'], {strictDi: true});
});
