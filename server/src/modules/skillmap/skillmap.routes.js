import { Router } from 'express';
import { getMap, getNode, enroll } from './skillmap.controller.js';   // ← add enroll here
import { authGuard } from '../../middleware/auth.guard.js';

const router = Router();

router.get ('/:slug/map',          authGuard, getMap);
router.get ('/:slug/node/:nodeId', authGuard, getNode);
router.post('/:slug/enroll',       authGuard, enroll);   // ← add this new line

export default router;