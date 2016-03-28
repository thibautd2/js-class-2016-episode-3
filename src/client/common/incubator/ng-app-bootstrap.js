/** Factoring some base stuff.
 */

import angular from 'angular';

//console.log('ng-app-bootstrap...');

let global_module_instance;

const app = {
  server_title: document.title,
  global_ng_module: undefined, // for now
  global_ng_module_dependencies: undefined, // for now
  bootstrap
};

// angular modules simplified ;-)
// nothing will execute before trying to access window.global_ng_module
Object.defineProperty(app, 'global_ng_module', {
  enumerable: true, // why not ?
  set: function() {
    throw new Error('You can’t assign global_ng_module !');
  },
  get: function() {
    if(global_module_instance) return global_module_instance; // already OK

    app.global_ng_module_dependencies =
      app.global_ng_module_dependencies ||
      window.app_global_ng_module_dependencies; // needed depending on load system

    console.log('* Creating global ng module...', app.global_ng_module_dependencies);
    global_module_instance = angular.module(
      'global_ng_module',
      app.global_ng_module_dependencies
    );
    return global_module_instance;
  }
});


// TODO reinstall uncaught exception handler which got replaced by who knows ??
//window.onerror =

// start AngularJs
function bootstrap() {
  
  // override the angular exception handler service.
  // http://blog.loadimpact.com/blog/exception-handling-in-an-angularjs-web-application-tutorial/
  app.global_ng_module.config(['$provide', $provide => $provide.decorator('$exceptionHandler',
    ['$log', '$delegate', ($log, $delegate) => (exception, cause) => {
      $log.error.apply($log, arguments);

      // TODO error graphic display

      $delegate(exception, cause);
    }])
  ]);

  // angular manual initialisation since we use a script loader
  // cf. http://docs.angularjs.org/guide/bootstrap
  console.log('* Bootstrapping angular...');
  // we must bind on document to encompass page title
  angular.element(document).ready(function() {
    angular.bootstrap(document, ['global_ng_module'], {strictDi: true});
  });
}

// expose
window._app = app;
export default app;

//console.log('offirmo-app-bootstrap bootstrap fully executed', window._app);
