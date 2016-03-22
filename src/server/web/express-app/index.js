import livereload from 'express-livereload';

import config from '../config';
import template_engine from './template_engine';
import midlewares from './middlewares';


function init_app(server, app) {

  /********************************** App **************************************/

  // security
  app.disable('x-powered-by');

  // declare all template engines
  // <extension> will be rendered with...
  app.engine(template_engine.extension, template_engine);

  // set default template engine
  app.set('view engine', template_engine.extension); // default extension to use when omitted

  // views directory : from base dir, defaults to /views
  app.set('views', config.dust_views_dir); // default extension to use when omitted

  // Because you're the type of developer who cares about this sort of thing ;-)
  if (config.web.strict_routing.enabled) {
    app.enable('strict routing'); // default false
    app.enable('case sensitive routing'); // default false
  }

  // to review : for running behind nginx or equiv.
  //app.enable('trust proxy');


  /********************************** Middlewares **************************************/


  // MUST be on top
  app.use(middlewares.using_domains({
    server: server,
    killTimeout: config.kill_timeout_s * 1000,
    onError: function onErrorDefault(req, res, next, err, options) {
      console.error('An error was caught by domains !', err);

      // trigger shutdown
      // (TODO)

      // let current connection close.
      res.setHeader('Connection', 'close');
      next(err);
    }
  }));

  // live-reload client each time client files change
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



  app.use(middleware.logging('dev'));

// Typically this middleware will come very early in your stack (maybe even first)
// to avoid processing any other middleware if we already know the request is for /favicon.ico
  app.use(middleware.serving_favicon(
    path.join(config.favicons_dir, '/favicon.ico')
  ));

// then static files which doesn't require special processing.
  app.use('/', middleware.serving_static_files( config.favicons_dir ));
  app.use('/client', middleware.serving_static_files(path.join(__dirname, '../../client')));
  app.use('/common', middleware.serving_static_files(path.join(__dirname, '../../common')));
  app.use('/bower_components', middleware.serving_static_files(path.join(__dirname, '../../bower_components')));

// TOREVIEW
//app.use('/ht', middleware.serving_directory_listing('../../client', {'icons': true}));

// now that we've passed static data which may be CDN'd or served by a reverse proxy,
// add the X-Response-Time header to our responses
  app.use(middleware.adding_XResponseTime_header());

// detect and pick the best locale
  app.use(middleware.detecting_best_locale(config.supported_locales, {logger: logger}));


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());

//  It is very important that this module is used before any module
// that needs to know the method of the request
//app.use(require('method-override')()); // https://github.com/expressjs/method-override

// "express debug toolbar"
// https://github.com/devoidfury/express-debug
  if(config.express_debug_enabled)
    require('express-debug')(app, {/* settings */});



  /********************************** routes **************************************/
  app.use(routes);


  /************************************************************************/
// error handling at the end
// "Though not mandatory error-handling middleware are typically defined very last,
//  below any other app.use() calls"
// http://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs
  app.use(function (err, req, res, next) {
    logger.log('1st error handler', err, err.stack);
    //logger.exception(err);

    // so we have an error. Do we have a status ?
    var status = err.status || 500;
    // (todo validate err.status)
    res.status(status);

    if(utils.is_internal_request(req)) {
      // Will not be seen by the user.
      // Respond the best we can.
      if (req.accepts('json'))
        return res.send({ error: 'server error : ' + status + ' (as json)' });
      else
        return res.type('txt').send('server error : ' + status + ' (as text)');
    }

    // ok, most likely a user browsing.
    // is it a full page or just an asset ?
    // (we don't want to costly render a template just for a missing favicon)
    if(req.url.slice(-4).indexOf('.') !== -1) {
      // there is a . (dot) in the last 4 chars,
      // most likely an file extension
      // so it must be an asset since our clean page urls don't have extensions.
      return res.send('error'); // short answer
    }

    // eventually
    try {
      res.render('error', { tpl: 'error', error: err });
    }
    catch(e) {
      logger.error('The error template didn´t work :', e);
      res.send(500, 'Something broke and the nice error template didn´t work !');
    }
  });

}

export default create;
