import express from 'express';

import config from '../../config';
import app_infos from '../../../common/static_data/app_infos';

import meta_routes from './metas';

const router = new express.Router();
export default router;

router.get('/', (req, res) => res.send('hello world'));

router.get('/meta', meta_routes);

