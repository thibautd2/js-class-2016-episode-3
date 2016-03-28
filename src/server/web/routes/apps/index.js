import path from 'path';
import fs from 'fs';

import express from 'express';

import config from '../../../config';

import create_app_router from './app-router';

const router = new express.Router();
export default router;

/////// attach all apps ///////

// http://stackoverflow.com/a/24594123/587407
function get_subdirectories(srcpath) {
  srcpath = path.resolve(srcpath);
  return fs.readdirSync(srcpath).filter(file => fs.statSync(path.join(srcpath, file)).isDirectory());
}
const APPS = get_subdirectories(config.web.client_apps.dir).filter(dir => dir != 'common');

console.log('* detected apps :\n' + global.pretty(APPS));

APPS.forEach(function(app_radix) {
  var app_router_options = {};

  try {
    var stats = fs.lstatSync(path.join(config.web.client_apps.dir, app_radix, 'view.dust'));
    // Is it a directory?
    if (stats.isFile()) {
      app_router_options.custom_template =
        '../../' + app_radix + '/view'; // REM : path relative to template root
    }
  }
  catch (e) {}

  if(app_radix === config.web.client_apps.default) {
    app_router_options.custom_route = '/';
    app_router_options.template_data = {
      apps: APPS
    };
  }

  console.log(' - Installing app "' + app_radix +'"...');
  //console.log(global.pretty(app_router_options));
  const app_router = create_app_router(app_radix, app_router_options);
  router.use('/', app_router);
});
