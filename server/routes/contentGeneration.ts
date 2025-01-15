import { Router } from 'express';
import { contentGenerationController } from '../controllers/contentGeneration';
import { validate } from '../middleware/validate';
import { contentGenerationSchema } from '../schemas/contentGeneration';

const router = Router();

router.post('/generate', 
  validate(contentGenerationSchema.generate), 
  contentGenerationController.generate
);

router.post('/save',
  validate(contentGenerationSchema.save),
  contentGenerationController.save
);

export default router;