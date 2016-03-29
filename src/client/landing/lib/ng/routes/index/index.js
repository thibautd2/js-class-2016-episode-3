window._app.global_ng_module.config(['$stateProvider', $stateProvider => {
  $stateProvider.state('index', {
    url: '/',
    templateUrl: 'client/landing/lib/ng/routes/index/index.html'
  });
}]);
