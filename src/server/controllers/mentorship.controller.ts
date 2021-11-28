import { RolesUtils } from './../../utils/roles.utils';
import { MentorshipUtil } from './../../utils/mentorship.util';
import { UserUtils } from './../../utils/user.utils';
import { Request, Response } from 'express';

class MentorShipController {
	async successMentorshipAssignment(req: Request, res: Response) {
		try {
			const { id_mentor: idMentor, id_mentee: idMentee } = req.body;

			const menteeUser = await UserUtils.getUser(idMentee);
			const mentorUser = await UserUtils.getUser(idMentor);
			const mentorshipUtil = new MentorshipUtil();
			await mentorshipUtil.successMentorshipAssignment(menteeUser, mentorUser);

			res.send({ msg: 'success' });
		} catch (err) {
			console.log(err);
			res.send({ msg: 'error' });
		}
	}

	async reminderMentorship(req: Request, res: Response) {
		const { id_mentor: idMentor, id_mentee: idMentee, hour } = req.body;
		const menteeUser = await UserUtils.getUser(idMentee);
		const mentorUser = await UserUtils.getUser(idMentor);

		const mentorshipUtil = new MentorshipUtil();
		await mentorshipUtil.mentorshipReminder(mentorUser, menteeUser, hour);
		res.send({ msg: 'success' });
	}

	async addRoleMentee(req: Request, res: Response) {
		try {
			const { user, role } = req.body;
			const member = await UserUtils.getMemberGuild(user);
			await RolesUtils.setRole(member, role);
			res.send({ msg: 'success' });
		} catch (error) {
			console.log(error);
			res.send({ msg: 'error' });
		}
	}

	async removeRoleMentee(req: Request, res: Response) {
		try {
			const { user, role } = req.body;
			const member = await UserUtils.getMemberGuild(user);
			await RolesUtils.removeRole(member, role);
			res.send({ msg: 'success' });
		} catch (error) {
			console.log(error);
			res.send({ msg: 'error' });
		}
	}
}

export default new MentorShipController();
