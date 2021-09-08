import { Command } from '../decorators/command.decorator';
import { BaseCommand } from './Base.command';
import { UserUtils } from '../utils/user.utils';
import { RolesUtils } from '../utils/roles.utils';
import { CommandError, ErrorMessages } from '../utils/error.utils';
@Command({ name: 'mentee' })
class MentorshipCommand extends BaseCommand {
	async execute() {
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

	buildMessage(message?: { message: string; delete: boolean }) {
		const [userMention, time, channel] = this.options.args;

		if (message) {
			return message;
		}

		if (!time && !channel) {
			return {
				message: `Rol Mentee agregado a ${userMention}`,
				delete: true,
			};
		}

		if (time && !channel) {
			return {
				message: `Hola ${userMention}, ${UserUtils.getUserId(this.options.message.author)} te espera en ${time} ${
					Number(time) > 1 ? 'minutos' : 'minuto'
				} <:fecfan:756224742771654696>`,
				delete: false,
			};
		}

		if (time && channel) {
			return {
				message: `Hola ${userMention}, ${UserUtils.getUserId(this.options.message.author)} te espera en ${time} ${
					Number(time) > 1 ? 'minutos' : 'minuto'
				} te espera en la sala de voz de ${channel} <:fecfan:756224742771654696>`,
				delete: false,
			};
		}
	}
}

export default new MentorshipCommand();
