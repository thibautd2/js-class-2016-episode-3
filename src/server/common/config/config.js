const package_json = require('../../../package.json');

export const config = {
	kill_timeout_s : 30,  //< max time we give ourselves to shutdown
	version: package_json.version,
};
