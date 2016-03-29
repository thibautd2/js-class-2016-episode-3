import express from 'express';

import app_infos from '../../../../common/static_data/app_infos';
import config from '../../../config';

const router = new express.Router();
export default router;

/////// attach all apis ///////


// It is very important that this module is used before any module
// that needs to know the method of the request
//app.use(require('method-override')()); // https://github.com/expressjs/method-override

// CORS

router.get('/', (req, res) => res.send('API TODO'));

