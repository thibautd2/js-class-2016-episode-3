// since it's safer to access dev from prod than prod from dev,
// default config targets dev and config.production.js specializes it to prod
const config = {
  version: '0.0.1',
  
  debug_infos_activated: true,

  strict_routing: {
    enabled: false
  },

};

export default config;
