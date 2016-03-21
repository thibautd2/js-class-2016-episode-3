// Load and use intl polyfill
// http://formatjs.io/guides/runtime-environments/#server
console.log('* on-demand intl polyfilling...');

import app_infos from '../../common/static-data/app-infos';
console.log('app infos :', global.pretty(app_infos));

var app_supported_locales = app_infos.supported_locales;
console.log('app app_supported_locales :', app_supported_locales);

if (global.Intl) {
  // Determine if the built-in `Intl` has the locale data we need.
  if (! require('intl-locales-supported')(app_supported_locales)) {
    // `Intl` exists, but it doesn't have the data we need, so load the
    // polyfill and replace the constructors with need with the polyfill's.
    console.log('* polyfilling partial intl...');
    const Intl_polyfill = require('intl');
    Intl.NumberFormat   = Intl_polyfill.NumberFormat;
    Intl.DateTimeFormat = Intl_polyfill.DateTimeFormat;
  }
} else {
  // No `Intl`, so use and load the polyfill.
  console.log('* polyfilling entire intl...');
  global.Intl = require('intl');
}
