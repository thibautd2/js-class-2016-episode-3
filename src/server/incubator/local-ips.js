/** Get local IPs for display at start, to ease debug with VMs / docker
 * http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
 */
import os from 'os';

import _ from 'lodash';


export default function get_local_ips() {
  return _.chain(os.networkInterfaces())
    .values()
    .flatten()
    .filter(val => val.internal === false)
    .map('address')
    .value();
}
