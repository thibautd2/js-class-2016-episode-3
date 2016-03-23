import express from 'express';

import config from '../../../common/config';
import app_infos from '../../../../common/static_data/app_infos';

const router = new express.Router();

router.get('/locale_test', (req, res) => {
  res.header('Content-Type', 'text/plain');
  res.send(
    'You asked for: ' + req.headers['accept-language'] + '\n' +
    'We support: ' + app_infos.supported_locales + '\n' +
    'Our default is: ' + app_infos.supported_locales[0] + '\n' +
    'The best match is: ' + req.locale + '\n' +
    'Choice reason: ' + req.locale_choice + '\n'
  );
});

// XXX TOREMOVE SECU
router.get('/config', function(req, res) {
  res.header('Content-Type', 'application/json');
  res.send(config);
});

export default router;
