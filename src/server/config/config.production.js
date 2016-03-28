const config = {
  cluster: {
    enabled: true
  },
  
  web: {
    cluster_worker_count: 3, // 3 only for heroku free tier compatibility (low RAM)
    
    livereload: {
      enabled: false
    },

    analytics: {
      enabled: true
    },

    express_debug_enabled: false
  }
};

export default config;
