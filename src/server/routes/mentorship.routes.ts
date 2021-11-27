import { Router } from 'express';
import { MentorShipController } from '../controllers';
const router = Router();

router.post('/assignmet', MentorShipController.successMentorshipAssignment);
router.post('/reminder', MentorShipController.reminderMentorship);
router.post('/addRole', MentorShipController.addRoleMentee);


export default router;
