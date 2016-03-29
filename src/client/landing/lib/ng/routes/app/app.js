window._app.global_ng_module.config(['$stateProvider', $stateProvider => {
  $stateProvider.state('app', {
    url: '/',
    templateUrl: 'client/landing/lib/ng/routes/app/app.html'
  });
}]);
