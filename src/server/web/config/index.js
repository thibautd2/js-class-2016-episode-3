import simplyconfig from 'simplyconfig';

// https://github.com/motdotla/dotenv
simplyconfig.dotenv.load({silent: true});

export const config = simplyconfig.create()

	// parent
	.add('../../common/config')

	// us
	.add('./config.js', {pattern: 'env+local'})

	// env vars
	.add({
		listening_port: '%PORT%',
	})

  .get();

//export default config;
