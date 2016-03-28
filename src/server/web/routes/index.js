import express from 'express';

import config from '../../config';

import meta_routes from './meta';

const router = new express.Router();
export default router;

router.get('/', (req, res) => res.send('hello world'));

router.use('/meta', meta_routes);
