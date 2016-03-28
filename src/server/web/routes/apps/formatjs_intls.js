/** Build localized messages in a format suitable for FormatJS
 *
 * object hashed by locale :
 * { en: {…}, fr: {…}, …}
 */
import path from 'path';

import _ from 'lodash';

import config from '../../../config';
import app_infos from '../../../../common/static_data/app_infos';


// TODO

// TODO
const language_independent_i18n_messages = {}; //require('../../client/common/i18n/common');

let shared_i18n_languages = {};
/*
app_infos.supported_locales.forEach((locale) => {
  shared_i18n_languages[locale] = require('../../client/common/i18n/common.' + locale);
});
*/

const DEFAULT_LOCALE = 'en';


export default function build_formatjs_locale (route, app_radix) {

  const formatJS_intls = _.zipObject(
    app_infos.supported_locales,
    app_infos.supported_locales.map(locale => {
      const messages = load_and_aggregate_message_files(locale, route, app_radix);

      // as expected by formatJS
      return {
        locales: locale,
        messages: messages
      };
    })
  );

  return formatJS_intls;
}


function load_and_aggregate_message_files(locale, route, app_radix) {
  const app_path = path.join(config.web.client_apps.dir, app_radix);

  let root_messages;
  let messages;
  let next_try;

  //console.log('  ~~~ resolving i18n for app "' + app_radix + '", lang "' + locale + '" ~~~');

  next_try = path.join(app_path, 'i18n/nls/root/messages');
  try {
    //console.log('trying ' + next_try);
    root_messages = require(next_try);
  } catch(e) {
    //console.warn('it seems that app "' + app_radix + '" has no root messages !', e);
  }

  next_try = path.join(app_path, 'i18n/nls/' + locale + '/messages');
  try {
    //console.log('trying ' + next_try);
    if (! messages) messages = require(next_try);
  } catch(e) {
    //console.warn('it seems that app "' + app_radix + '" has no "' + locale + '" locale !', e);
  }

  // maybe this lang is not avail ?
  if(locale !== DEFAULT_LOCALE) {
    next_try = path.join(app_path, 'i18n/' + DEFAULT_LOCALE + '/messages');
    try {
      //console.log('trying ' + next_try);
      if (! messages) messages = require(next_try);
    } catch(e) {
      //console.warn('it seems that app "' + app_radix + '" has no "' + DEFAULT_LOCALE + '" locale !', e);
    }
  }

  messages = _.defaults(
    {
      canonical_url: app_infos.canonical_url + route
    },
    messages,
    root_messages,
    shared_i18n_languages[locale],
    language_independent_i18n_messages
  );

  return messages;
}
