import { Command } from '../decorators/command.decorator';
import { BaseCommand } from './Base.command';
import { UserUtils } from '../utils/user';
@Command({ name:'mentee' })
class MentorshipCommand extends BaseCommand {

	async execute() {
		this.options.message.delete();
		// build discord user id
		const user = UserUtils.getUserId(this.options.message.mentions.users.first());
		console.log(user);
		return `Rol Asignado a ${user}`;
	}
}

export default new MentorshipCommand();
