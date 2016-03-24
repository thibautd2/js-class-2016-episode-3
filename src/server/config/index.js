import simplyconfig from 'simplyconfig';

const config = simplyconfig.create({autodetect_es2015: true})

	// parent
	.add('../../common/config')

	// us
	.add('./config.js', {pattern: 'env+local'});

// export raw data
const config_data = config.get();
export default config_data;

//console.log('* [server config] :\n' + global.pretty(config_data));
