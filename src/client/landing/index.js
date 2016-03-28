console.log('loading landing app main js...');

app.global_ng_module_dependencies = ['ngAria', 'ngAnimate', 'ngMessages', 'ngMaterial'];

import app from 'client/common/incubator/ng-app-bootstrap';
import 'angular';
import 'angular-aria';
import 'angular-animate';
import 'angular-messages';
import 'angular-material';
import 'angular-material/angular-material.css!';
import 'angular-material/angular-material.layouts.css!';

const ng_module = app.global_ng_module; // singleton : access cause creation

// override the angular exception handler service.
// http://blog.loadimpact.com/blog/exception-handling-in-an-angularjs-web-application-tutorial/
ng_module.config(['$provide', $provide => $provide.decorator('$exceptionHandler',
  ['$log', '$delegate', ($log, $delegate) => (exception, cause) => {
    $log.error.apply($log, arguments);

    // TODO error graphic display

    $delegate(exception, cause);
  }])
]);

// now that global module is ready, load ng modules
ng_module.controller('LandingController', ['$scope', ($scope) => {
  console.info('LandingController…');

  // TODO reinstall uncaught exception handler which got replaced by who knows ??
  //window.onerror =

  // TODO locale
  $scope.title = app.server_title;

  console.info('LandingController initialized.');
}]);

// use more convenient AMD syntax
require([
  'client/landing/content'
], () => {
  // angular manual initialisation since we use a script loader
  // cf. http://docs.angularjs.org/guide/bootstrap
  console.log('Bootstrapping angular...');
  // we must bind on document to encompass page title
  angular.element(document).ready(function() {
    angular.bootstrap(document, ['global_ng_module'], {strictDi: true});
  });
})
