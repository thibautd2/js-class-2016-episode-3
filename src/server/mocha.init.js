'use strict';

/** Bootstrap mocha/chai unit tests for SERVER
 */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiDatetime = require('chai-datetime');
const chaiThings = require('chai-things');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(chaiAsPromised);
chai.use(chaiDatetime);
chai.use(chaiThings);
chai.use(sinonChai);

// expose for convenience
global.sinon = sinon;
global.expect = chai.expect;
