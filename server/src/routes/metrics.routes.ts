import { Router } from 'express';
import {
  getOverviewMetrics,
  getStageDistribution,
  getSourcePerformance,
  getRepPerformance,
} from '../controllers/metrics.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// All metrics endpoints require authentication
router.use(authenticateJWT);

router.get('/overview', getOverviewMetrics);
router.get('/pipeline', getStageDistribution);
router.get('/sources', getSourcePerformance);
router.get('/reps', getRepPerformance);

export default router;
