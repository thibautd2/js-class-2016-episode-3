import express from 'express';

import app_infos from '../../../../common/static_data/app_infos';
import config from '../../../config';

const router = new express.Router();
export default router;

/////// attach all apis ///////

router.get('/', (req, res) => res.send('API TODO'));
