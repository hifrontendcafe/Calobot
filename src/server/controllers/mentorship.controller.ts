import { MentorshipUtil } from './../../utils/mentorship.util';
import { UserUtils } from './../../utils/user.utils';
import { Request, Response } from 'express';

class MentorShipController {

	async successMentorshipAssignment(req: Request, res: Response) {
		try {
			const { id_mentor, id_mentee } = req.body;

			const menteeUser = await UserUtils.getUser(id_mentee);
			const mentorUser = await UserUtils.getUser(id_mentor);
			const mentorshipUtil = new MentorshipUtil();
			await mentorshipUtil.successMentorshipAssignment(menteeUser, mentorUser);

			res.send({ msg: 'success' });
		} catch (err) {
			console.log(err);
			res.send({ msg: 'error' });
		}
	}

	async reminderMentorship(req: Request, res: Response) {
		const { id_mentor, id_mentee, hour } = req.body;
		const menteeUser = await UserUtils.getUser(id_mentee);
		const mentorUser = await UserUtils.getUser(id_mentor);

		const mentorshipUtil = new MentorshipUtil();
		await mentorshipUtil.mentorshipReminder(mentorUser, menteeUser, hour);
		res.send({ msg: 'success' });
	}

	// reminder to mentor
	reminder(req: Request, res: Response) {
		const { mentor, mentee } = req.body;
		res.send({ mentor, mentee });
	}
}

export default new MentorShipController();
