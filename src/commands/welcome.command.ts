import { Command } from '../decorators/command.decorator';
import { CommandResponse } from '../utils/command.utils';
import { BaseCommand } from './Base.command';

@Command({ name: 'welcome', prefix: '[' })
class WelcomeCommand extends BaseCommand {
	execute() {
		return new CommandResponse({ message: 'Welcome command, run with welcome', delete: false });
	}
}

export default new WelcomeCommand();
