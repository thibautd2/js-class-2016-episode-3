/** Create routes for a given SPA
 */

import _ from 'lodash';
import express from 'express';

import config from '../../../config';

import build_formatjs_locale from './formatjs_intls';


export function create_app_router(app_radix, options) {
  options = options || {};
  options.template_data = options.template_data || {};

  const default_route = '/' + app_radix;
  const formatJS_intls = build_formatjs_locale(options.custom_route || default_route, app_radix);
  // REM : path relative to template root
  const template_path = options.custom_template || 'single-page_webapp';

  // common data
  const common_view_data = _.defaults({
    template_path: template_path, //< for debug
    livereload_enabled: config.web.livereload.enabled,

    // app radix, needed for some paths
    app_radix: app_radix,

    main_script: 'client/' + app_radix + '/index',

    // path to the appcache manifest file (relative to ?) TODO
    //appcache_manifest: 'client/apps/' + app_radix + '/manifest.appcache',

    // path to the minified js TODO
    //minified_js: 'client/apps-minified/' + app_radix + '/all_js.concat+min.js',

    // TODO
    //favicons_path: '/client/apps/boringrpg/assets/favicons',

    // analytics
    analytics_enabled: config.web.analytics.enabled,
    version: config.version

  }, options.template_data);

  /////// routes ///////
  const router = new express.Router();

  // production route
  console.log('* SPA ' + app_radix + ' : registering route ' + default_route);
  router.get(default_route, function serve_production(req, res) {
    let template_data = _.defaults({
      // formatJS i18n dynamic data
      lang: req.locale,
      intl: formatJS_intls[req.locale]
    }, common_view_data);
    //console.log('* rendering app "' + app_radix + '", template data =\n' + global.pretty(template_data));
    res.render(template_path, template_data);
  });

  // custom route (if any)
  if (options.custom_route) {
    // production route alias
    console.log('* SPA ' + app_radix + ' : registering custom route ' + options.custom_route);
    router.get(options.custom_route, function serve_production(req, res) {
      let template_data = _.defaults({
        // formatJS i18n dynamic data
        lang: req.locale,
        intl: formatJS_intls[req.locale]
      }, common_view_data);
      //console.log('* rendering app "' + app_radix + '", template data =\n' + global.pretty(template_data));
      res.render(template_path, template_data);
    });
  }

  return router;
}
export default create_app_router;
