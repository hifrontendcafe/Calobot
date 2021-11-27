import { Client } from 'discord.js';
import { DiscordConfig } from './../../config/discord.config';
import { MentorshipUtil } from './../../utils/mentorship.util';
import { UserUtils } from './../../utils/user.utils';
import { Request, Response } from 'express';
import { client } from '../../client/client.instance';
import { cli } from 'winston/lib/winston/config';

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
			const { user, role } = req.body;
			const menteeUser = await UserUtils.getUser(user);

			await client.guilds.cache.get(DiscordConfig.Client.GUILD_ID).members.edit(menteeUser, {
				roles: [role],
			});
			res.send({ msg: 'success' });
		} catch (error) {
			console.log(error);
			res.send({ msg: 'error' });
		}
	}
}

export default new MentorShipController();
