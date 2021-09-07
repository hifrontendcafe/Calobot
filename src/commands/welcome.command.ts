import { Command } from '../decorators/command.decorator';
import { BaseCommand } from './Base.command';

@Command({ name: 'welcome' })
class WelcomeCommand extends BaseCommand {
	execute() {
		return 'Welcome command, run with welcome';
	}
}

export default new WelcomeCommand();
