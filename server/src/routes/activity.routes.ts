import { Router } from 'express';
import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../controllers/activity.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { validateBody, validateQuery } from '../middlewares/validate.middleware.js';
import {
  createActivitySchema,
  updateActivitySchema,
  queryActivitiesSchema,
} from '../schemas/activity.schema.js';

const router = Router();

// All activity endpoints require authentication
router.use(authenticateJWT);

router.get('/', validateQuery(queryActivitiesSchema), getActivities);
router.post('/', validateBody(createActivitySchema), createActivity);
router.put('/:id', validateBody(updateActivitySchema), updateActivity);
router.delete('/:id', deleteActivity);

export default router;
