import simplyconfig from 'simplyconfig';

const config = simplyconfig.create({autodetect_es2015: true})

  // us
  .add('./config.js', {pattern: 'env+local'});

// export simplyconfig object since we're an intermediate config
export default config;
