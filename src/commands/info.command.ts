import { Command } from '../decorators/command.decorator';
import { CommandResponse } from '../utils/command.utils';
import { CommandError, ErrorMessages } from '../utils/error.utils';
import { UserUtils } from '../utils/user.utils';
import { BaseCommand } from './Base.command';

// @Command({ name: 'info' })
class InfoCommand extends BaseCommand {
	execute(): CommandResponse {
		const [user, option] = this.options.args;
		if (user === 'help') {
			return this.validations();
		}
		this.options.message.delete();
		return new CommandResponse({
			message: `Info command, run with info`,
		});
	}

	validations() {
		const [user, option] = this.options.args;
		const validOptions = ['m', 'q', 'help'];

		/**
		 * Como no se le paso un usuario en el primer parametro,
		 * entonces, help es el 2do parametro y reemplaza a options
		 */
		if (user === 'help') {
			return this.help();
		}

		if (!UserUtils.isUser(user)) {
			throw new CommandError({ message: ErrorMessages.User.NotValid });
		}

		if (!validOptions.includes(option)) {
			throw new CommandError({ message: ErrorMessages.Info.ArgNotValid(option) });
		}
	}

	help() {
		return new CommandResponse({
			message: `Todos los comandos de info`,
		});
	}
}

export default new InfoCommand();
