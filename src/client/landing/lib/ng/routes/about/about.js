window._app.global_ng_module.config(['$stateProvider', $stateProvider => {
  $stateProvider.state('about', {
    url: '/about',
    templateUrl: 'client/landing/lib/ng/routes/about/about.html'
  });
}]);
