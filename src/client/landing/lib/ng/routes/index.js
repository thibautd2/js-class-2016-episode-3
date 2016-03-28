import './about/about';

window._app.global_ng_module.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {

  // For any unmatched url, redirect to index
  $urlRouterProvider.otherwise('/');

  // Now set up the states
  $stateProvider.state('index', {
    url: '/',
    templateUrl: 'client/landing/lib/ng/routes/index.html'
  });
}]);
