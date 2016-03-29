import path from 'path';

import config from '../../config';
import template_engine from './template_engine';
import create_middlewares from './middlewares';
import routes from '../routes';

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
  if (config.strict_routing.enabled) {
    app.enable('strict routing'); // default false
    app.enable('case sensitive routing'); // default false
    // see also middleware : express-slash
  }

  // to review : for running behind nginx or equiv.
  //app.enable('trust proxy');

  // useful to know if we want to display stack errors to the user
  // TOREVIEW
  app.locals.showErrorStackTrace = config.debug_infos_activated;

  // TOREVIEW
  app.set('cache', false);

  /********************************** Middlewares **************************************/

  const middlewares = create_middlewares(server, app);

  // tag the requests with a unique id
  app.use(middlewares.assign_uuid);

  // identify requests rendering to a page from others (xhr, api...)
  app.use(middlewares.identify_page_requests);

  app.use(middlewares.log_requests);

  // activate compression
  app.use(middlewares.compress_response_body);

  // then static files which doesn't require special processing.
  // Typically this middleware will come very early in the stack
  // to avoid processing any other middleware if we already know the request is for a static file
  app.use('/',              middlewares.serve_static_files( config.web.favicons_dir ));
  app.use('/client',        middlewares.serve_static_files('src/client'));
  app.use('/common',        middlewares.serve_static_files('src/common'));
  app.use('/jspm_packages', middlewares.serve_static_files('jspm_packages'));
  app.get('/config.js', (req, res) => res.sendFile('config.js', { root: process.cwd()}));

  // now that we've passed static data which may be CDN'd or served by a reverse proxy,
  // add the X-Response-Time header to our responses
  app.use(middlewares.add_response_time_header);

  // needed to read request params
  app.use(middlewares.parse_request.json());
  app.use(middlewares.parse_request.urlencoded({ extended: false }));

  // detect and pick the best locale
  app.use(middlewares.detect_best_locale);

  /********************************** routes **************************************/

  app.use(routes);

  // fallback
  // 'catch all' = default / 404 for a webapp
  app.use(middlewares.handle_unmatched_with_404);

  /************************************************************************/

  // error handling at the end
  // "Though not mandatory error-handling middleware are typically defined very last,
  //  below any other app.use() calls"
  // http://stackoverflow.com/questions/6528876/how-to-redirect-404-errors-to-a-page-in-expressjs
  app.use(middlewares.handle_errors);
}

export default init_app;
