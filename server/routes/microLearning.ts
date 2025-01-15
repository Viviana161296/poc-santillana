import { Router } from 'express';
import { microLearningController } from '../controllers/microLearning';
import { validate } from '../middleware/validate';
import { microLearningSchema } from '../schemas/microLearning';

const router = Router();

router.get('/', microLearningController.getAll);
router.get('/:id', microLearningController.getById);
router.post('/', validate(microLearningSchema.create), microLearningController.create);
router.put('/:id', validate(microLearningSchema.update), microLearningController.update);
router.delete('/:id', microLearningController.delete);
router.post('/:id/map', validate(microLearningSchema.mapping), microLearningController.createMapping);

export default router;