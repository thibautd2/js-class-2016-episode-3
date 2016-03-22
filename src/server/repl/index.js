#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../../node_modules/.bin/babel-node "$0" "$@"

console.log('\n\n\n*** Hello from repl tests ! ***\n');

require('../common/logger-setup'); // first of first

import common_config from '../../common/config';
import server_config from '../common/config';

console.log('* common config = \n' + global.pretty(common_config.get()));
console.log('* server config = \n' + global.pretty(server_config));
