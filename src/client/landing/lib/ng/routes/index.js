import './index/index';
import './about/about';
import './app/app';

window._app.global_ng_module.config(['$urlRouterProvider', ($urlRouterProvider) => {
  // For any unmatched url, redirect to index
  $urlRouterProvider.otherwise('/');
}]);
