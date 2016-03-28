import express from 'express';

import config from '../../config';

import meta_routes from './meta';
import app_routes from './apps';
import api_routes from './api';

const router = new express.Router();
export default router;

router.use('/meta', meta_routes);
router.use('/', app_routes);
router.use('/api', api_routes);
