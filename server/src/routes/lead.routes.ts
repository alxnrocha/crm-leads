import { Router } from 'express';
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  updateLeadStage,
  deleteLead,
} from '../controllers/lead.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { validateBody } from '../middlewares/validate.middleware.js';
import {
  createLeadSchema,
  updateLeadSchema,
  updateLeadStageSchema,
} from '../schemas/lead.schema.js';

const router = Router();

// All lead endpoints require authentication
router.use(authenticateJWT);

router.get('/', getLeads);
router.get('/:id', getLeadById);
router.post('/', validateBody(createLeadSchema), createLead);
router.put('/:id', validateBody(updateLeadSchema), updateLead);
router.patch('/:id/stage', validateBody(updateLeadStageSchema), updateLeadStage);
router.delete('/:id', deleteLead);

export default router;
