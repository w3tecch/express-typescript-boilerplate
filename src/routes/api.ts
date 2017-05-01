import * as express from 'express';

import { userRoutes } from '../api/routes/users';

const router = express.Router();
const API_PREFIX = '/api';

router.use(API_PREFIX, userRoutes);

export const api = router;
