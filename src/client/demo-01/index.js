
import 'angular';
import 'angular-ui-router';

const appModule = angular.module('app_module', [ 'ui.router' ]);

appModule.controller('AppController', ['$scope', function ($scope) {
  this.title = 'Demo 01';

  $scope.$watch(() => console.count('$digest'));
}]);

appModule.component('layout', {
  templateUrl: 'client/demo-01/layout.html'
});

// angular manual initialisation since we use a script loader
console.log('* Bootstrapping angular...');
angular.element(document).ready(function() {
  angular.bootstrap(document, ['app_module'], {strictDi: true});
});
