/** State of the art web server serving an advanced AngularJS single-page web app
 */

import http from 'http';

import '../utils/polyfill-intl';

import express from 'express';

import config from '../config';
import init_express_app from './express-app';
import get_local_ips from '../incubator/local-ips';


/* TODO
var shutdown   = require('./shutdown');
var install_io = require('./primus');
*/


/************************************************************************/

// manual simultaneous creation of the http server + express app
// in order to be able to use https
// cf. http://expressjs.com/en/4x/api.html#app.listen
const app = express();
const server = http.createServer(app);

init_express_app(server, app);
// TODO install_io(server);

/************************************************************************/
// TODO listen to more server events !
server.listen(config.web.listening_port, function() {
	console.log('* Now listening on :');
  get_local_ips().forEach(ip => console.log('  http://' + ip + ':' + config.web.listening_port));
	console.log('(Ctrl+C to stop)');
});
