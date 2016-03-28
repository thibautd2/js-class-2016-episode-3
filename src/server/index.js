#!/usr/bin/env node

/** ROOT OF A JS fullstack app
 *
 * Server wrapper with optional cluster launch.
 * https://discussion.heroku.com/t/recommended-use-of-nodes-cluster-module/96
 */

console.log('\n\n*** Hello from cluster master ! ***');
console.log('(Ctrl+C to stop)');

require('./utils/logger-setup'); // first of first

const config = require('./config').default; // REM : default for ES6->CommonJs
//console.log('* [cluster master] server config = \n' + global.pretty(config));

const env = process.env.NODE_ENV || 'development';
console.log('* [cluster master] env = ' + env);
console.log('* [cluster master] cluster enabled = ' + config.cluster.enabled);

if(config.cluster.enabled) {
  // cluster launch, heroku compatible with nice features
  // https://github.com/brianc/node-forky
  console.log('* [cluster master] CLUSTER launch...');
  var forky = require('forky');

  // https://github.com/brianc/node-forky/blob/master/examples/master.js
  forky.log = function() { console.log.apply(console, arguments); };

  // TODO fork workers
  var forky_options = {
    path: __dirname + '/web/index',
    enable_logging: true,
    workers: config.web.cluster_worker_count
  };
  forky(forky_options);
}
else {
  // normal, plain launch (one instance)
  console.log('* [cluster master] NO-cluster launch...');
  require('./web/index');
}
