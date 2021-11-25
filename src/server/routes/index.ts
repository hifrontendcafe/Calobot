import { Router } from 'express';
import MentorshipRoutes from './mentorship.routes';
const router = Router();

router.get('/', (req, res) => {
	res.json({
		message: 'Welcome to the MatebotJS / Calomentor API',
		version: '1.0.0',
	});
});

router.use('/mentorship', MentorshipRoutes);

export default router;
