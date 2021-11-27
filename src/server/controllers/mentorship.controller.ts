import { MessageEmbedCustom } from './../../@types/index.d';
import { MessageUtils } from './../../utils/message.utils';
import { MentorshipUtil } from './../../utils/mentorship.util';
import { UserUtils } from './../../utils/user.utils';
import { Request, Response } from 'express';
import { client } from '../../client/client.instance';

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

	async addRoleMentee(req: Request, res: Response) {
		try {
			const { id_user, id_role } = req.body;
			// const menteeUser = await UserUtils.getUser(id_user);
			const menteeUser = await client.guilds.cache.get(process.env.GUILD_ID).members.cache.find(m => m.id === id_user);
			const menteeRole = client.guilds.cache.find(rol => rol.id === id_role);
			// const menteeRole = RolesUtils.findRoleByName('Mentee');   // <<<----
			console.log(menteeUser, menteeRole);
			console.log(client.guilds.cache);

			res.send({ msg: 'success' });
		} catch (error) {
			console.log(error);
			res.send({ msg: 'error' });
		}
	}
}

export default new MentorShipController();
