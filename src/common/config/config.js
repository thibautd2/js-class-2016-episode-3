// since it's safer to access dev from prod than prod from dev,
// default config targets dev and config.production.js specializes it to prod
const config = {
  debug_infos_activated: true,
};

export default config;
