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
import { validateBody, validateQuery } from '../middlewares/validate.middleware.js';
import {
  createLeadSchema,
  updateLeadSchema,
  updateLeadStageSchema,
  queryLeadsSchema,
} from '../schemas/lead.schema.js';

const router = Router();

// All lead endpoints require authentication
router.use(authenticateJWT);

router.get('/', validateQuery(queryLeadsSchema), getLeads);
router.get('/:id', getLeadById);
router.post('/', validateBody(createLeadSchema), createLead);
router.put('/:id', validateBody(updateLeadSchema), updateLead);
router.patch('/:id/stage', validateBody(updateLeadStageSchema), updateLeadStage);
router.delete('/:id', deleteLead);

export default router;
