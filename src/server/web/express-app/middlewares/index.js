import path from 'path';

///////////////// middlewares modules /////////////////

// TODO logger winston

// live-reload client each time client files change
// https://www.npmjs.org/package/express-livereload
import livereload from 'express-livereload';

// favicon serving middleware
// https://github.com/expressjs/serve-favicon
// (static-favicon is an alias)
import serve_favicon from 'serve-favicon';

// Serve static files
// http://expressjs.com/en/4x/api.html#express.static
import {static as serve_static_files} from 'express';

// activate file compression
import compression from 'compression';

// add a unique uid to each requests
import uuid from 'connect-uuid';

// Serve directory listings
// https://github.com/expressjs/serve-index
// TOREVIEW
//import serve_directory_listing from 'serve-index';
//app.use('/ht', middleware.serve_directory_listing('../../client', {'icons': true}));

// adds a X-Response-Time header to responses.
// https://github.com/expressjs/response-time
import response_time from 'response-time';

// locale negotiation
// https://github.com/jed/locale
// TODO replace with a more clever one (handling facebook etc.)
import locale from 'locale';

// "express debug toolbar"
// https://github.com/devoidfury/express-debug
import express_debug from 'express-debug';

//var method_unifier = require('method-override'); // https://github.com/expressjs/method-override

//var bodyParser = require('body-parser'); // for, well, parsing body.
// mainly useful for REST (POST, PUT)
// https://github.com/expressjs/body-parser


// https://github.com/ericf/express-slash

import handle_errors from './error';
import fallback_to_404 from './404';

import morgan from 'morgan';

////////////////////////////////////////////////////////////////////////

import config from '../../../common/config';
import app_infos from '../../../../common/static_data/app_infos';

const cwd = process.cwd();

function create(server, app) {
  const middlewares = {};

  ////////////////////////////////////

  // special tool ! If used, will automatically attach itself as a middleware (!)
  if(config.web.express_debug_enabled)
    express_debug(app, { /* settings */ });

  ////////////////////////////////////

  middlewares.logger = morgan('dev'); // TODO

  ////////////////////////////////////

  // special tool ! If used
  // - will open its own server
  // - will automatically attach itself as a middleware (!)
  if(config.web.livereload.enabled) {
    console.log('* using express-livereload watching "' + config.web.livereload.watched_dir + '"…');
    livereload(app, {
      // options are documented in the underlying module :
      // https://github.com/napcs/node-livereload#api-options
      watchDir: config.web.livereload.watched_dir,
      debug: config.web.livereload.debug,
      port: config.web.livereload.port,
      exts: config.web.livereload.watched_extensions
    });
  }

  ////////////////////////////////////

  middlewares.serve_favicon = serve_favicon(
    path.join(config.web.favicons_dir, '/favicon.ico')
  );

  ////////////////////////////////////
  middlewares.detect_best_locale = locale(
    app_infos.supported_locales,
    {
      //logger: logger
    }
  );

  ////////////////////////////////////

  middlewares.serve_static_files = serve_static_files;

  ////////////////////////////////////

  middlewares.add_response_time_header = response_time();
  middlewares.compress_response_body = compression();
  middlewares.affect_uuid = uuid();
  middlewares.handle_errors = handle_errors;
  middlewares.fallback_to_404 = fallback_to_404;

  ////////////////////////////////////

  return middlewares;
}

export default create;
