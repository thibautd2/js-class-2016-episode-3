/** State of the art web server serving an advanced AngularJS single-page web app
 */


/************************************************************************/
import path from 'path';
import cluster from 'cluster';
import http from 'http';

import _ from 'lodash';
import pretty from 'prettyjson';
import livereload from 'express-livereload';

import config from './config';
import app from './express-app';

/*
var middleware = require('./middlewares');
var utils      = require('./utils');
var shutdown   = require('./shutdown');
var routes     = require('./routes');
var install_io = require('./primus');
*/

console.log('* [web server] config =', pretty.render(config));



/************************************************************************/
// manual creation of the http server
// in order to use domainMiddleware
// cf. http://expressjs.com/4x/api.html#app.listen
const server = http.createServer(app);

/************************************************************************/
// https://www.npmjs.org/package/express-livereload
if(config.livereload.enabled) {
	console.log('* configuring express-livereload to watch "' + config.livereload.watched_dir + '"…');
  livereload(app, {
		// https://github.com/napcs/node-livereload#api-options
		watchDir: config.livereload.watched_dir,
		debug:    config.livereload.debug,
		port:     config.livereload.port,
		exts:     config.livereload.watched_extensions
	});
}



install_io(server);

/************************************************************************/
server.listen(config.listening_port, function() {
	console.log('* Now listening on :');
	/*_.forEach(utils.get_local_ips(), function(ip) {
		logger.log('  http://' + ip + ':' + config.listening_port);
	});*/
	console.log('(Ctrl+C to stop)');
});
