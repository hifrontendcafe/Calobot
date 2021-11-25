import { Router } from 'express';
import { MentorShipController } from '../controllers';
const router = Router();

router.post('/assignmet', MentorShipController.successMentorshipAssignment);
router.post('/reminder', MentorShipController.reminderMentorship);

export default router;
