/** State of the art web server serving an advanced AngularJS single-page web app
 */

import path from 'path';
import cluster from 'cluster';
import http from 'http';

import '../common/polyfill-intl';

import _ from 'lodash';
import express from 'express';

import config from '../common/config';
import init_app from './express-app';
import getLocalIps from '../common/incubator/local-ips';


/*
var utils      = require('./utils');
var shutdown   = require('./shutdown');
var routes     = require('./routes');
var install_io = require('./primus');
*/


/************************************************************************/

// manual creation of the http server + express app
// in order to use domainMiddleware and https
// cf. http://expressjs.com/en/4x/api.html#app.listen
const app = express();
const server = http.createServer(app);

init_app(server, app);

// install_io(server);

/************************************************************************/
// TODO lesten to more server events !
server.listen(config.web.listening_port, function() {
	console.log('* Now listening on :');
  getLocalIps().forEach(ip => console.log('  http://' + ip + ':' + config.web.listening_port));
	console.log('  (Ctrl+C to stop)');
});
