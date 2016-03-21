import simplyconfig from 'simplyconfig';

export const config = simplyconfig.create()

	// parent
	.add('../../../common/config')

	// us
	.add('./config.js', {pattern: 'env+local'})

  .get();
