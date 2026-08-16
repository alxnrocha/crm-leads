import { Router } from 'express';
import {
  getStages,
  getStageById,
  createStage,
  updateStage,
  deleteStage,
  reorderStages,
} from '../controllers/stage.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import {
  createStageSchema,
  updateStageSchema,
  reorderStagesSchema,
} from '../schemas/stage.schema.js';

const router = Router();

// All stage endpoints require authentication
router.use(authenticateJWT);

router.get('/', getStages);
router.get('/:id', getStageById);
router.post('/', validateBody(createStageSchema), createStage);
router.put('/:id', validateBody(updateStageSchema), updateStage);
router.delete('/:id', deleteStage);
router.post('/reorder', validateBody(reorderStagesSchema), reorderStages);

export default router;
