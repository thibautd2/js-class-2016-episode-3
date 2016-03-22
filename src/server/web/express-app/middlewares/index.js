
// wraps handling into a domain
// https://github.com/expressjs/domain-middleware
import domain_middleware from 'domain-middleware';

// favicon serving middleware
// https://github.com/expressjs/serve-favicon
// (static-favicon is an alias)
import serve_favicon from 'serve-favicon';

// TODO logger winston

// Serve static files
// https://github.com/expressjs/serve-static
import {static as serve_static_files} from 'express';

// Serve directory listings
// https://github.com/expressjs/serve-index
import serve_directory_listing from 'serve-index';

// adds a X-Response-Time header to responses.
// https://github.com/expressjs/response-time
import add_XResponseTime_header from 'response-time';


// locale negotiation
// https://github.com/jed/locale
// TODO replace with a more clever one (handling facebook etc.)
//detecting_best_locale: require('locale'),
//import detect_best_locale from '../common/incubator/localizer';



//var method_unifier = require('method-override'); // https://github.com/expressjs/method-override

//var bodyParser = require('body-parser'); // for, well, parsing body.
// mainly useful for REST (POST, PUT)
// https://github.com/expressjs/body-parser


// https://github.com/ericf/express-slash

const middlewares = {

};

export default middlewares;
