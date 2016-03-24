// Load and use intl polyfill
// http://formatjs.io/guides/runtime-environments/#server
console.log('* [intl polyfill] on-demand setup...');

import app_infos from '../../common/static_data/app_infos';

var app_supported_locales = app_infos.supported_locales;

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (! require('intl-locales-supported')(app_supported_locales)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and replace the constructors with need with the polyfill's.
    console.log('* [intl polyfill] polyfilling partial intl...');
    const Intl_polyfill = require('intl');
    global.Intl.NumberFormat   = Intl_polyfill.NumberFormat;
    global.Intl.DateTimeFormat = Intl_polyfill.DateTimeFormat;
  }
  else
    console.log('* [intl polyfill] no needed.');
} else {
  // No `Intl`, so use and load the polyfill.
  console.log('* [intl polyfill] polyfilling entire intl...');
  global.Intl = require('intl');
}
