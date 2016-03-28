/** Factoring some base stuff.
 */

import angular from 'angular';

console.log('executing ng-app-bootstrap bootstrap...');

let global_module_instance;

const app = {
  server_title: document.title,
  global_ng_module: undefined, // for now
  global_ng_module_dependencies: undefined, // for now
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

    console.log('Creating global ng module...', app.global_ng_module_dependencies);
    global_module_instance = angular.module(
      'global_ng_module',
      app.global_ng_module_dependencies
    );
    return global_module_instance;
  }
});

// expose
window._app = app;
export default app;

console.log('offirmo-app-bootstrap bootstrap fully executed', window._app);
