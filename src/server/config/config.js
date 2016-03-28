// since it's safer to access dev from prod than prod from dev,
// defaults config targets dev and config.production.js specializes it to prod


import path from 'path';

const config = {
  kill_timeout_s : 30,  //< max time we give ourselves to shutdown

  cluster: {
    enabled: false
  },

  web: {
    listening_port: 7000,

    strict_routing: {
      enabled: false
    },

    morgan: {
      // see morgan middleware doc
      upfront_format: '-> :uuid :method :url',
      final_format: '<- :uuid :remote-addr :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
    },

    // https://www.npmjs.org/package/express-livereload
    livereload: {
      enabled: true,
      watched_dir: '/src/client', // optim
      port: 35730, //< note : official default is 35729
      watched_extensions: [ 'dust', 'html', 'css', 'js', 'png', 'gif', 'jpg' ],
      debug: true // ?
    },

    analytics: {
      enabled: false
    },

    // https://github.com/devoidfury/express-debug
    express_debug_enabled: true,

    dust_views_dir: 'src/client/common/views',
    favicons_dir: 'src/client/common/assets/root-expected-files',

    primus: {
      transformer: 'engine.io'
    },
  }
};

export default config;
