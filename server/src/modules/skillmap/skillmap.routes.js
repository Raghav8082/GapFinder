import { Router } from 'express';
import { getMap, getNode } from './skillmap.controller.js';
import { authGuard } from '../../middleware/auth.guard.js';

const router = Router();

router.get('/:slug/map',            authGuard, getMap);
router.get('/:slug/node/:nodeId',   authGuard, getNode);

export default router;