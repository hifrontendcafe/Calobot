import { Command } from '../decorators/command.decorator';
import { CommandError, ErrorMessages } from '../utils/error.utils';
import { UserUtils } from '../utils/user.utils';
import { BaseCommand } from './Base.command';

@Command({ name: 'info' })
class InfoCommand extends BaseCommand {
	execute() {
		const [user, option] = this.options.args;
		this.validations();

		return {
			message: `Info command, run with info`,
			delete: false,
		};
	}

	validations() {
		const [user, option] = this.options.args;
		const validOptions = ['m', 'q', 'help'];
		if (!UserUtils.isUser(user)) {
			throw new CommandError({ message: ErrorMessages.User.NotValid });
		}

		if (!validOptions.includes(option)) {
			throw new CommandError({ message: ErrorMessages.Info.ArgNotValid(option) });
		}
	}
}

export default new InfoCommand();
