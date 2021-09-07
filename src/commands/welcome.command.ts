import { Command } from '../decorators/command.decorator';
import { BaseCommand } from './Base.command';

@Command({ name: 'welcome', prefix: '[' })
class WelcomeCommand extends BaseCommand {
	execute() {
		return { message: 'Welcome command, run with welcome', delete: false };
	}
}

export default new WelcomeCommand();
