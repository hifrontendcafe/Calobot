import { Command } from '../decorators/command.decorator';
import { BaseCommand } from './Base.command';
import { UserUtils } from '../utils/user.utils';
import { RolesUtils } from '../utils/roles.utils';
import { CommandError, ErrorMessages } from '../utils/error.utils';
import { CommandResponse } from '../utils/command.utils';
// @Command({ name: 'mentee' })
class MentorshipCommand extends BaseCommand {
	execute(): CommandResponse {
		const [userMention] = this.options.args;

		this.options.message.delete();
		this.validations();

		const rolesUtils = new RolesUtils(this.options.message, 'mentee');

		const user = UserUtils.getFirstUser(this.options.message);

		if (rolesUtils.checkRole(user)) {
			rolesUtils.removeRole(user);
			return this.buildMessage({ message: `Rol Mentee removido a ${userMention}`, delete: true });
		}

		rolesUtils.setRole(user);
		return this.buildMessage();
	}

	validations() {
		const [user] = this.options.args;

		if (!UserUtils.isUser(user)) {
			throw new CommandError({ message: ErrorMessages.User.NotValid });
		}

		if (!UserUtils.isMentor(this.options.message)) {
			throw new CommandError({ message: ErrorMessages.Role.RoleNotValid('Mentor') });
		}

		if (!user) {
			throw new CommandError({ message: ErrorMessages.Mentorship.UserNotValid });
		}
	}

	buildMessage(message?: CommandResponse): CommandResponse {
		const [userMention, time, channel] = this.options.args;

		if (message) {
			return new CommandResponse({
				message: message.message,
				delete: message.delete,
			});
		}

		if (!time && !channel) {
			return new CommandResponse({
				message: `Rol Mentee agregado a ${userMention}`,
				delete: true,
				deleteAfter: 3,
			});
		}

		if (time && !channel) {
			return new CommandResponse({
				message: `Hola ${userMention}, ${UserUtils.getUserId(this.options.message.author)} te espera en ${time} ${
					Number(time) > 1 ? 'minutos' : 'minuto'
				} <:fecfan:756224742771654696>`,
			});
		}

		if (time && channel) {
			return new CommandResponse({
				message: `Hola ${userMention}, ${UserUtils.getUserId(this.options.message.author)} te espera en ${time} ${
					Number(time) > 1 ? 'minutos' : 'minuto'
				} te espera en la sala de voz de ${channel} <:fecfan:756224742771654696>`,
			});
		}
	}
}

export default new MentorshipCommand();
