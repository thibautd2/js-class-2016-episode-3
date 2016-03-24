import config from '../../config';
import template_engine from './template_engine';
import create_middlewares from './middlewares';
import routes from '../routes';

const cwd = process.cwd();


function init_app(server, app) {

  /********************************** App **************************************/

  // security
  app.disable('x-powered-by');

  // declare all template engines - <extension> will be rendered with...
  app.engine(template_engine.extension, template_engine);

  // set default template engine
  app.set('view engine', template_engine.extension); // default extension to use when omitted

  // views directory : from base dir, defaults to /views
  app.set('views', config.web.dust_views_dir); // default extension to use when omitted

  // Because you're the type of developer who cares about this sort of thing ;-)
  if (config.web.strict_routing.enabled) {
    app.enable('strict routing'); // default false
    app.enable('case sensitive routing'); // default false
  }

  // to review : for running behind nginx or equiv.
  //app.enable('trust proxy');

  // TODO
  // useful to know if we want to display stack errors to the user
  //app.locals.showErrorStackTrace = config.get('showErrorStackTrace');

  /********************************** Middlewares **************************************/

  // add an empty middleware for some bogus tools that require at last one :-(
  app.use((req, res, next) => {
    console.log('seen something...');
    next()
  });

  const middlewares = create_middlewares(server, app);

  // tag the requests with a unique id
  app.use(middlewares.affect_uuid);

  // log requests
  app.use(middlewares.logger);

  // Typically this middleware will come very early in your stack (maybe even first)
  // to avoid processing any other middleware if we already know the request is for /favicon.ico
  app.use(middlewares.serve_favicon);

  // activate compression
  app.use(middlewares.compress_response_body);

  // then static files which doesn't require special processing.
  // TODO path.join(cwd,
  app.use('/',              middlewares.serve_static_files( config.web.favicons_dir ));
  app.use('/client',        middlewares.serve_static_files('src/client'));
  app.use('/common',        middlewares.serve_static_files('src/common'));
  app.use('/jspm_packages', middlewares.serve_static_files('jspm_packages'));

  // now that we've passed static data which may be CDN'd or served by a reverse proxy,
  // add the X-Response-Time header to our responses
  app.use(middlewares.add_response_time_header);

  // detect and pick the best locale
  app.use(middlewares.detect_best_locale);

  //app.use(bodyParser.json());
  //app.use(bodyParser.urlencoded());

  // It is very important that this module is used before any module
  // that needs to know the method of the request
  //app.use(require('method-override')()); // https://github.com/expressjs/method-override


  /********************************** routes **************************************/
  app.use(routes);

  // fallback
  // 'catch all' = default / 404 for a webapp
  app.use(middlewares.fallback_to_404);

  /************************************************************************/
  // error handling at the end
  // "Though not mandatory error-handling middleware are typically defined very last,
  //  below any other app.use() calls"
  // http://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs
  app.use(middlewares.handle_errors);
}

export default init_app;
