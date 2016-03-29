/** State of the art web server serving an advanced AngularJS single-page web app
 */

import http from 'http';

import '../utils/logger-setup'; // first of first
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

// listen to important events :
server.on('error', (e) => console.log('* [http server] error', e));
server.on('clientError', (e) => console.log('* [http server] clientError', e));
server.on('listening', () => {
  console.log('* [http server] Now listening on :');
  get_local_ips().forEach(ip => console.log('  http://' + ip + ':' + config.web.listening_port));
});
server.on('close', () => console.log('* [http server] close'));
server.on('connect', () => console.log('* [http server] connect'));
server.on('connection', () => console.log('* [http server] connection'));
server.on('request', (req, res) => {
  console.log('* [http server] request');
  res.on('close', () => console.log('* [http response] close'));
  res.on('finish', () => console.log('* [http response] finish'));
  req.setTimeout(config.web.response_timeout_s * 1000, () => {
    console.log('* [http response] timeout', arguments);
  });
});

// start the server
server.listen(config.web.listening_port);
