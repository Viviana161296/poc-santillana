import { Router } from 'express';
import { contentGenerationController } from '../controllers/contentGeneration.ts';
import { contentGenerationSchema } from '../schemas/contentGeneration.ts';

const router = Router();

router.post(
  '/generate_content',
  contentGenerationController.generate // Controlador
);

router.post(
  '/save',
  contentGenerationController.save // Controlador
);

export default router;